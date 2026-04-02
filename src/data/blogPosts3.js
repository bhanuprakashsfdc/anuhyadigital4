// Blog Posts 21-30 - Generated data file
const blogPosts3 = [
  {
    id: 21,
    slug: "building-ai-chatbots-for-websites",
    category: "AI Design",
    title: "Building AI Chatbots for Websites: A Developer's Complete Guide",
    keyword: "AI chatbot web development",
    date: "2026-03-15",
    readTime: "14 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Learn how to build intelligent AI chatbots for modern websites using the latest APIs, frameworks, and conversational design patterns that drive engagement.",
    content: `<h2>Introduction</h2>
<p>AI chatbot web development has evolved dramatically over the past few years. What once required extensive NLP infrastructure and dedicated ML teams can now be accomplished with a few API calls and well-structured prompts. Modern chatbots go beyond simple FAQ responders — they understand context, maintain conversation history, integrate with business systems, and provide genuinely helpful interactions that improve user experience and drive conversions.</p>
<p>In this comprehensive guide, we will walk through building a production-ready AI chatbot from scratch. You will learn how to set up the backend service, manage conversation state, handle streaming responses, implement tool-calling for real-time data retrieval, and create a polished frontend widget. Every concept is accompanied by real code examples you can adapt to your own projects.</p>
<p>Whether you are adding a support assistant to a SaaS dashboard, building a sales qualification bot for an e-commerce site, or creating an internal knowledge base assistant, the patterns covered here will give you a solid foundation. We focus on practical, production-grade techniques rather than toy demos.</p>

<h2>Best Practices for AI Chatbot Development</h2>
<ul>
<li><strong>Design conversation flows before writing code.</strong> Map out the key user journeys, fallback scenarios, and escalation paths. A chatbot without thoughtful conversation design will frustrate users regardless of how powerful the underlying model is.</li>
<li><strong>Implement system prompts carefully.</strong> Your system prompt defines the chatbot's personality, knowledge boundaries, and behavioral rules. Spend time crafting it and version-control your prompts like you would any code artifact.</li>
<li><strong>Use streaming responses.</strong> Users expect to see text appearing progressively, not waiting several seconds for a complete response. Server-Sent Events (SSE) or WebSocket connections enable real-time token streaming that dramatically improves perceived performance.</li>
<li><strong>Maintain conversation context wisely.</strong> Token limits mean you cannot send unlimited history. Implement sliding window strategies, summarization of older messages, and smart context pruning to keep conversations coherent without exceeding model limits.</li>
<li><strong>Add guardrails and content filtering.</strong> Implement input validation, output moderation, and topic boundaries. Use the model's built-in safety features alongside your own validation layer to prevent misuse and ensure appropriate responses.</li>
<li><strong>Log and monitor conversations.</strong> Track conversation metrics like resolution rate, user satisfaction, fallback frequency, and average conversation length. This data is essential for continuous improvement and identifying where your chatbot struggles.</li>
<li><strong>Provide graceful fallbacks.</strong> When the chatbot cannot help, make it easy for users to reach a human agent. Smooth handoff mechanisms preserve context and prevent user frustration during the escalation process.</li>
<li><strong>Optimize for mobile experiences.</strong> Chat interfaces on mobile devices have unique constraints. Use responsive layouts, appropriate touch targets, and minimize the keyboard interaction required from users.</li>
</ul>

<h2>Code Example: Backend Chat Service</h2>
<pre><code>&lt;!-- Server-side chat endpoint using Node.js --&gt;
&lt;pre&gt;&lt;code&gt;
const express = require('express');
const OpenAI = require('openai');
const app = express();

app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const conversations = new Map();

function getConversationHistory(sessionId) {
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, [{
      role: 'system',
      content: 'You are a helpful customer support assistant for Anuhya Digital. Answer questions about web development, Salesforce, and design services. Be concise and professional.'
    }]);
  }
  return conversations.get(sessionId);
}

function trimHistory(history, maxTokens = 4000) {
  const systemMsg = history[0];
  let messages = [systemMsg];
  let tokenEstimate = 0;
  for (let i = history.length - 1; i >= 1; i--) {
    const msgTokens = history[i].content.length / 4;
    if (tokenEstimate + msgTokens > maxTokens) break;
    tokenEstimate += msgTokens;
    messages.splice(1, 0, history[i]);
  }
  return messages;
}

app.post('/api/chat', async (req, res) => {
  const { sessionId, message } = req.body;
  const history = getConversationHistory(sessionId);
  history.push({ role: 'user', content: message });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const trimmedHistory = trimHistory(history);

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: trimmedHistory,
      stream: true,
      max_tokens: 1024,
      temperature: 0.7
    });

    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        res.write(\`data: \${JSON.stringify({ content })}\\n\\n\`);
      }
    }
    history.push({ role: 'assistant', content: fullResponse });
    res.write('data: [DONE]\\n\\n');
    res.end();
  } catch (error) {
    res.write(\`data: \${JSON.stringify({ error: error.message })}\\n\\n\`);
    res.end();
  }
});

app.listen(3000, () =&gt; console.log('Chat server running on port 3000'));
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Step-by-Step: Implementing Infinite Scroll for Chat Message History</h2>
<p>As conversations grow longer, loading all messages at once becomes impractical. Here is how to implement infinite scroll for chat history.</p>
<h3>Step 1: Set Up the Message Container</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
&lt;div id="chat-container" class="chat-scroll"&gt;
  &lt;div id="load-more-trigger"&gt;&lt;/div&gt;
  &lt;div id="messages"&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;style&gt;
.chat-scroll {
  height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.message {
  padding: 12px 16px;
  margin: 8px;
  border-radius: 12px;
  max-width: 80%;
}
.message.user {
  align-self: flex-end;
  background: #0066cc;
  color: white;
}
.message.assistant {
  align-self: flex-start;
  background: #f0f0f0;
}
&lt;/style&gt;
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 2: Create the Pagination API Endpoint</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
app.get('/api/messages/:sessionId', async (req, res) =&gt; {
  const { sessionId } = req.params;
  const cursor = parseInt(req.query.cursor) || 0;
  const limit = parseInt(req.query.limit) || 20;

  const history = getConversationHistory(sessionId);
  const totalMessages = history.length - 1; // exclude system message
  const start = Math.max(1, totalMessages - cursor - limit);
  const end = Math.max(1, totalMessages - cursor);

  const messages = history.slice(start, end + 1).filter(m =&gt; m.role !== 'system');
  const hasMore = start &gt; 1;
  const nextCursor = hasMore ? cursor + limit : null;

  res.json({ messages, hasMore, nextCursor });
});
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 3: Implement the Intersection Observer</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class ChatHistoryLoader {
  constructor(containerId, sessionId) {
    this.container = document.getElementById(containerId);
    this.sessionId = sessionId;
    this.cursor = 0;
    this.loading = false;
    this.hasMore = true;
    this.setupObserver();
  }

  setupObserver() {
    const trigger = document.getElementById('load-more-trigger');
    const observer = new IntersectionObserver((entries) =&gt; {
      if (entries[0].isIntersecting &amp;&amp; !this.loading &amp;&amp; this.hasMore) {
        this.loadMore();
      }
    }, { root: this.container, threshold: 0.1 });
    observer.observe(trigger);
  }

  async loadMore() {
    this.loading = true;
    const scrollHeight = this.container.scrollHeight;

    try {
      const response = await fetch(
        \`/api/messages/\${this.sessionId}?cursor=\${this.cursor}\`
      );
      const data = await response.json();

      data.messages.forEach(msg =&gt; {
        const el = this.createMessageElement(msg);
        const trigger = document.getElementById('load-more-trigger');
        this.container.insertBefore(el, trigger.nextSibling);
      });

      this.container.scrollTop = this.container.scrollHeight - scrollHeight;
      this.cursor = data.nextCursor || this.cursor;
      this.hasMore = data.hasMore;
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      this.loading = false;
    }
  }

  createMessageElement(msg) {
    const div = document.createElement('div');
    div.className = \`message \${msg.role}\`;
    div.textContent = msg.content;
    return div;
  }
}

const loader = new ChatHistoryLoader('chat-container', 'session-abc123');
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 4: Add Loading States and Error Handling</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
async loadMore() {
  if (this.loading || !this.hasMore) return;
  this.loading = true;
  this.showLoader();

  try {
    const response = await fetch(
      \`/api/messages/\${this.sessionId}?cursor=\${this.cursor}\`
    );

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    if (data.messages.length === 0) {
      this.hasMore = false;
      this.showEndOfHistory();
      return;
    }

    this.prependMessages(data.messages);
    this.cursor = data.nextCursor;
    this.hasMore = data.hasMore;
  } catch (error) {
    this.showError('Failed to load messages. Tap to retry.');
  } finally {
    this.loading = false;
    this.hideLoader();
  }
}

showLoader() {
  const loader = document.createElement('div');
  loader.id = 'chat-loader';
  loader.className = 'chat-loader';
  loader.innerHTML = '&lt;div class="spinner"&gt;&lt;/div&gt; Loading messages...';
  this.container.insertBefore(loader, this.container.firstChild.nextSibling);
}

hideLoader() {
  const loader = document.getElementById('chat-loader');
  if (loader) loader.remove();
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 5: Maintain Scroll Position on Load</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
prependMessages(messages) {
  const scrollHeightBefore = this.container.scrollHeight;
  const trigger = document.getElementById('load-more-trigger');

  messages.reverse().forEach(msg =&gt; {
    const el = this.createMessageElement(msg);
    trigger.after(el);
  });

  requestAnimationFrame(() =&gt; {
    const scrollHeightAfter = this.container.scrollHeight;
    this.container.scrollTop = scrollHeightAfter - scrollHeightBefore;
  });
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 6: Integrate with Streaming for New Messages</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
async sendMessage(text) {
  const userMsg = { role: 'user', content: text };
  this.appendMessage(userMsg);

  const assistantDiv = document.createElement('div');
  assistantDiv.className = 'message assistant streaming';
  this.container.appendChild(assistantDiv);

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: this.sessionId,
      message: text
    })
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split('\\n');
    for (const line of lines) {
      if (line.startsWith('data: ') &amp;&amp; line !== 'data: [DONE]') {
        const data = JSON.parse(line.slice(6));
        assistantDiv.textContent += data.content;
        this.scrollToBottom();
      }
    }
  }

  assistantDiv.classList.remove('streaming');
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 7: Optimize with Virtual Scrolling for Long Histories</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class VirtualChatList {
  constructor(container, messages, itemHeight = 80) {
    this.container = container;
    this.messages = messages;
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
    this.startIndex = 0;

    this.container.style.position = 'relative';
    this.container.style.overflow = 'auto';
    this.wrapper = document.createElement('div');
    this.wrapper.style.height = \`\${messages.length * itemHeight}px\`;
    this.container.appendChild(this.wrapper);

    this.container.addEventListener('scroll', () =&gt; this.render());
    this.render();
  }

  render() {
    const scrollTop = this.container.scrollTop;
    this.startIndex = Math.floor(scrollTop / this.itemHeight);
    const endIndex = Math.min(this.startIndex + this.visibleCount, this.messages.length);

    this.wrapper.innerHTML = '';
    for (let i = this.startIndex; i &lt; endIndex; i++) {
      const el = document.createElement('div');
      el.className = \`message \${this.messages[i].role}\`;
      el.style.position = 'absolute';
      el.style.top = \`\${i * this.itemHeight}px\`;
      el.style.height = \`\${this.itemHeight}px\`;
      el.textContent = this.messages[i].content;
      this.wrapper.appendChild(el);
    }
  }
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Conclusion</h2>
<p>Building an AI chatbot for modern websites requires thoughtful architecture that balances real-time responsiveness with resource efficiency. The patterns covered in this guide — streaming responses, conversation state management, infinite scroll history loading, and virtual scrolling — form the foundation of a production-ready chat system. Start with a solid backend service, add a polished frontend with proper loading states, and iterate based on real user interaction data. The code examples provided are designed to be modular and adaptable, allowing you to integrate them into your existing stack whether you are using React, Vue, vanilla JavaScript, or any other framework.</p>`
  },
  {
    id: 22,
    slug: "machine-learning-in-frontend-development",
    category: "AI Design",
    title: "Machine Learning in Frontend Development: Practical Applications",
    keyword: "machine learning frontend",
    date: "2026-03-18",
    readTime: "13 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Explore how machine learning models can be integrated directly into frontend applications using TensorFlow.js, ONNX Runtime, and browser-native APIs.",
    content: `<h2>Introduction</h2>
<p>Machine learning in frontend development has transitioned from experimental curiosity to practical necessity. With libraries like TensorFlow.js, ONNX Runtime Web, and the built-in Web Neural Network API, developers can now run sophisticated ML models directly in the browser without sending sensitive data to external servers. This opens up possibilities for real-time image classification, natural language processing, anomaly detection, and personalized user experiences — all running client-side with minimal latency.</p>
<p>The browser environment presents unique constraints for ML workloads: limited memory, variable compute capabilities across devices, and the need for non-blocking execution. Understanding these constraints and choosing the right deployment strategy is critical. Some applications benefit from lightweight custom models, while others perform better using pre-trained models optimized for browser execution through techniques like quantization and pruning.</p>
<p>This guide focuses on practical, production-ready techniques for integrating ML into frontend applications. We cover model selection, browser-based inference, performance optimization, and real-world patterns including infinite scroll for prediction results. Every example uses concrete code that you can adapt to your own projects.</p>

<h2>Best Practices for ML in Frontend Development</h2>
<ul>
<li><strong>Choose the right model format for the browser.</strong> TensorFlow.js models (.json + .bin) integrate natively with the TF.js library. ONNX models offer cross-platform portability. The Web Neural Network API (WebNN) provides hardware-accelerated inference on supporting browsers. Evaluate each based on your target platforms and model architecture.</li>
<li><strong>Quantize models for browser deployment.</strong> Full-precision floating-point models are often too large and slow for browser use. Apply int8 or float16 quantization to reduce model size by 50-75% with minimal accuracy loss. TensorFlow.js provides built-in quantization tools, and ONNX supports quantization through onnxruntime-tools.</li>
<li><strong>Use Web Workers for inference.</strong> Running ML inference on the main thread blocks user interaction. Offload model loading and prediction to Web Workers, communicating results back via postMessage. This keeps the UI responsive even during computationally intensive predictions.</li>
<li><strong>Implement model caching aggressively.</strong> Browser caching, IndexedDB, and Cache API can store downloaded models so they do not need to be re-fetched on every page load. Set long cache headers on model files and use a versioned URL scheme to bust the cache when models are updated.</li>
<li><strong>Lazy-load models on demand.</strong> Do not load every model at startup. Load models only when the user navigates to the feature that needs them. Use dynamic imports and loading indicators to manage the user experience during model initialization.</li>
<li><strong>Batch predictions when possible.</strong> Processing multiple inputs in a single inference call is significantly more efficient than running individual predictions. For image classification on a gallery page, batch images together rather than classifying them one at a time.</li>
<li><strong>Monitor inference performance per device.</strong> Track model loading time, inference latency, and memory usage across different devices and browsers. Use this data to decide when to fall back to a server-side API for devices that cannot handle client-side inference efficiently.</li>
<li><strong>Provide meaningful loading states.</strong> Model initialization can take several seconds, especially on mobile devices. Show progress indicators with estimated time remaining, and consider showing placeholder content while the model loads so users understand the application is working.</li>
</ul>

<h2>Code Example: Image Classification with TensorFlow.js</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
import * as tf from '@tensorflow/tfjs';
import { MobileNet } from '@tensorflow-models/mobilenet';

class ImageClassifier {
  constructor() {
    this.model = null;
    this.loading = false;
  }

  async loadModel() {
    if (this.model) return this.model;
    if (this.loading) {
      await new Promise(resolve =&gt; {
        const check = setInterval(() =&gt; {
          if (this.model) { clearInterval(check); resolve(); }
        }, 100);
      });
      return this.model;
    }
    this.loading = true;
    try {
      this.model = await MobileNet.load({ version: 2, alpha: 1.0 });
      return this.model;
    } finally {
      this.loading = false;
    }
  }

  async classify(imageElement, topK = 5) {
    if (!this.model) await this.loadModel();
    const predictions = await this.model.classify(imageElement, topK);
    return predictions.map(p =&gt; ({
      label: p.className,
      probability: Math.round(p.probability * 10000) / 100
    }));
  }

  async classifyBatch(imageElements) {
    if (!this.model) await this.loadModel();
    const results = [];
    for (const img of imageElements) {
      results.push(await this.classify(img, 3));
    }
    return results;
  }
}

const classifier = new ImageClassifier();

document.getElementById('file-input').addEventListener('change', async (e) =&gt; {
  const file = e.target.files[0];
  if (!file) return;

  const img = document.createElement('img');
  img.src = URL.createObjectURL(file);
  await img.decode();

  const predictions = await classifier.classify(img);
  const resultsEl = document.getElementById('results');
  resultsEl.innerHTML = predictions
    .map(p =&gt; \`&lt;li&gt;\${p.label}: \${p.probability}%&lt;/li&gt;\`)
    .join('');
});
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Step-by-Step: Infinite Scroll for ML Prediction Results</h2>
<p>When running predictions on large datasets like image galleries or document collections, you need an efficient way to display and paginate results. Here is how to build an infinite scroll interface for ML predictions.</p>
<h3>Step 1: Set Up the Prediction Worker</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
// ml-worker.js
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet');

let model = null;

self.onmessage = async (e) =&gt; {
  const { type, data } = e.data;

  if (type === 'init') {
    model = await MobileNet.load({ version: 2, alpha: 0.5 });
    self.postMessage({ type: 'ready' });
  }

  if (type === 'predict') {
    const { images, batchId } = data;
    const results = [];

    for (const imgData of images) {
      const tensor = tf.tensor3d(imgData.pixels, imgData.shape);
      const prediction = await model.classify(tensor);
      tensor.dispose();
      results.push({
        id: imgData.id,
        predictions: prediction.map(p =&gt; ({
          label: p.className,
          confidence: p.probability
        }))
      });
    }

    self.postMessage({ type: 'results', data: { batchId, results } });
  }
};
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 2: Create the Prediction Results Component</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
function PredictionCard({ result }) {
  const topPrediction = result.predictions[0];
  return \`
    &lt;div class="prediction-card"&gt;
      &lt;img src="\${result.thumbnail}" alt="\${topPrediction.label}" /&gt;
      &lt;div class="prediction-info"&gt;
        &lt;h3&gt;\${topPrediction.label}&lt;/h3&gt;
        &lt;div class="confidence-bar"&gt;
          &lt;div style="width: \${topPrediction.confidence * 100}%"&gt;&lt;/div&gt;
        &lt;/div&gt;
        &lt;span&gt;\${Math.round(topPrediction.confidence * 100)}% confidence&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  \`;
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 3: Implement Batch Processing with Queuing</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class MLPredictionQueue {
  constructor(workerUrl, batchSize = 4) {
    this.worker = new Worker(workerUrl);
    this.batchSize = batchSize;
    this.queue = [];
    this.processing = false;
    this.results = [];
    this.onResult = null;

    this.worker.onmessage = (e) =&gt; {
      if (e.data.type === 'results') {
        this.results.push(...e.data.data.results);
        if (this.onResult) this.onResult(e.data.data.results);
        this.processNext();
      }
    };

    this.worker.postMessage({ type: 'init' });
  }

  enqueue(items) {
    this.queue.push(...items);
    if (!this.processing) this.processNext();
  }

  processNext() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }
    this.processing = true;
    const batch = this.queue.splice(0, this.batchSize);
    this.worker.postMessage({
      type: 'predict',
      data: { images: batch, batchId: Date.now() }
    });
  }
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 4: Build the Infinite Scroll Container</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class InfiniteMLResults {
  constructor(containerId, predictionQueue) {
    this.container = document.getElementById(containerId);
    this.queue = predictionQueue;
    this.page = 0;
    this.pageSize = 12;
    this.loading = false;
    this.allItems = [];

    this.queue.onResult = (results) =&gt; this.renderResults(results);
    this.setupIntersection();
  }

  setupIntersection() {
    const sentinel = document.createElement('div');
    sentinel.id = 'scroll-sentinel';
    sentinel.className = 'scroll-sentinel';
    this.container.appendChild(sentinel);

    const observer = new IntersectionObserver((entries) =&gt; {
      if (entries[0].isIntersecting &amp;&amp; !this.loading) {
        this.loadNextPage();
      }
    }, { rootMargin: '200px' });

    observer.observe(sentinel);
  }

  async loadNextPage() {
    this.loading = true;
    this.showSpinner();

    const response = await fetch(
      \`/api/images?page=\${this.page}&amp;size=\${this.pageSize}\`
    );
    const { items, hasMore } = await response.json();

    if (items.length === 0) {
      this.showEnd();
      return;
    }

    this.allItems.push(...items);
    this.queue.enqueue(items);
    this.page++;
    this.loading = false;
    this.hideSpinner();

    if (!hasMore) this.showEnd();
  }

  renderResults(results) {
    const sentinel = document.getElementById('scroll-sentinel');
    results.forEach(result =&gt; {
      const card = document.createElement('div');
      card.innerHTML = PredictionCard({ result });
      card.className = 'result-card animate-in';
      this.container.insertBefore(card, sentinel);
    });
  }

  showSpinner() {
    const spinner = document.getElementById('scroll-sentinel');
    spinner.innerHTML = '&lt;div class="loading"&gt;Running predictions...&lt;/div&gt;';
  }

  hideSpinner() {
    const spinner = document.getElementById('scroll-sentinel');
    spinner.innerHTML = '';
  }

  showEnd() {
    const sentinel = document.getElementById('scroll-sentinel');
    sentinel.innerHTML = '&lt;p class="end-message"&gt;All results loaded&lt;/p&gt;';
  }
}

const queue = new MLPredictionQueue('/ml-worker.js', 4);
const results = new InfiniteMLResults('results-container', queue);
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 5: Add Progress Tracking and Error Recovery</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class MLProgressTracker {
  constructor(totalItems) {
    this.total = totalItems;
    this.completed = 0;
    this.failed = 0;
    this.progressBar = document.getElementById('progress-bar');
    this.statusText = document.getElementById('progress-text');
  }

  increment() {
    this.completed++;
    this.update();
  }

  incrementFailed() {
    this.failed++;
    this.update();
  }

  update() {
    const pct = ((this.completed + this.failed) / this.total) * 100;
    this.progressBar.style.width = \`\${pct}%\`;
    this.statusText.textContent = \`Processed \${this.completed}/\${this.total} (\${this.failed} failed)\`;
  }

  isComplete() {
    return (this.completed + this.failed) &gt;= this.total;
  }
}

// Integration with queue
queue.onResult = (results) =&gt; {
  results.forEach(() =&gt; tracker.increment());
  renderResults(results);
};
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 6: Optimize with RequestIdleCallback</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
function scheduleInference(predictionFn, items) {
  return new Promise((resolve) =&gt; {
    const results = [];
    let index = 0;

    function processNext() {
      if (index &gt;= items.length) {
        resolve(results);
        return;
      }

      if ('requestIdleCallback' in window) {
        requestIdleCallback(async (deadline) =&gt; {
          while (deadline.timeRemaining() &gt; 16 &amp;&amp; index &lt; items.length) {
            const result = await predictionFn(items[index]);
            results.push(result);
            index++;
          }
          processNext();
        });
      } else {
        setTimeout(async () =&gt; {
          const result = await predictionFn(items[index]);
          results.push(result);
          index++;
          processNext();
        }, 0);
      }
    }

    processNext();
  });
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Conclusion</h2>
<p>Integrating machine learning into frontend applications opens up powerful capabilities while keeping user data private and latency low. The key to success is choosing the right model size for the browser environment, offloading computation to Web Workers, and building interfaces that gracefully handle loading states and batch processing. The infinite scroll pattern for prediction results keeps the UI responsive while processing large datasets progressively. Start with pre-trained models like MobileNet for common tasks, and only invest in custom models when your use case demands it.</p>`
  },
  {
    id: 23,
    slug: "css-scroll-driven-animations",
    category: "Web Development",
    title: "CSS Scroll-Driven Animations: Creating Immersive Web Experiences",
    keyword: "CSS scroll-driven animations",
    date: "2026-03-22",
    readTime: "12 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Master the CSS scroll-driven animations API to build performant, GPU-accelerated scroll effects without JavaScript scroll event listeners.",
    content: `<h2>Introduction</h2>
<p>CSS scroll-driven animations represent a fundamental shift in how we create scroll-based visual effects on the web. Instead of relying on JavaScript scroll event listeners that trigger layout recalculations and cause jank, the scroll-driven animations API ties CSS animations directly to scroll position. This approach leverages the browser's compositor thread, resulting in buttery-smooth 60fps animations that do not block the main thread or degrade performance on low-powered devices.</p>
<p>The API introduces two new animation timeline types: <code>scroll()</code>, which links animation progress to the scroll position of a scroll container, and <code>view()</code>, which links animation progress to an element's visibility within its scroll container. Combined with the existing <code>animation-timeline</code>, <code>animation-range</code>, and <code>animation-duration</code> properties, developers have precise control over how animations respond to scrolling behavior.</p>
<p>This guide covers everything you need to implement scroll-driven animations in production. We start with foundational concepts, progress through practical patterns with real code, and culminate in a complete infinite scroll implementation that uses view-driven animations to create a polished content-loading experience. All examples are written for the modern CSS environment as of 2026.</p>

<h2>Best Practices for CSS Scroll-Driven Animations</h2>
<ul>
<li><strong>Prefer CSS scroll-driven animations over JavaScript scroll listeners.</strong> JavaScript-based scroll animations run on the main thread and can cause layout thrashing. CSS scroll-driven animations execute on the compositor thread, keeping interactions smooth even during heavy scroll activity. Only fall back to JavaScript when you need logic that CSS cannot express.</li>
<li><strong>Use the view() timeline for element-reveal animations.</strong> The <code>view()</code> timeline automatically tracks when an element enters and exits the scroll viewport. This is perfect for fade-in, slide-in, and scale-up effects as users scroll content into view. Define entry and exit ranges using <code>animation-range</code> for precise timing control.</li>
<li><strong>Combine scroll() with custom properties for dynamic values.</strong> Use <code>@property</code> to register custom properties that can be animated, then reference them in your styles. This allows you to create complex effects like parallax depth, color transitions, and morphing shapes driven by scroll position.</li>
<li><strong>Set animation-duration to auto for scroll timelines.</strong> When using <code>animation-timeline: scroll()</code> or <code>view()</code>, set <code>animation-duration: auto</code> so the animation duration maps 1:1 with the scroll range. Using fixed durations with scroll timelines creates confusing behavior.</li>
<li><strong>Test on low-powered devices.</strong> While scroll-driven animations are GPU-accelerated, complex animations with many simultaneous elements can still strain mobile devices. Use <code>will-change</code> sparingly and test on real hardware to ensure acceptable frame rates.</li>
<li><strong>Provide reduced-motion alternatives.</strong> Respect the <code>prefers-reduced-motion</code> media query by disabling or simplifying scroll-driven animations for users who have indicated a preference for reduced motion. This is both an accessibility best practice and increasingly a legal requirement.</li>
<li><strong>Use animation-range for fine-grained control.</strong> The <code>animation-range</code> property lets you specify exactly where in the scroll range an animation starts and ends. Use named ranges like <code>entry 0% entry 100%</code> or explicit percentages to create staggered, overlapping, or sequential animations.</li>
<li><strong>Leverage @supports for progressive enhancement.</strong> Wrap scroll-driven animation code in <code>@supports (animation-timeline: scroll())</code> queries. Browsers that do not support the API will fall back to static layouts, ensuring a functional experience everywhere.</li>
</ul>

<h2>Code Example: Basic Scroll-Linked Animation</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
@supports (animation-timeline: scroll()) {
  @keyframes progress-bar {
    from { transform: scaleX(0); }
    to { transform: scaleX(1); }
  }

  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    transform-origin: left;
    transform: scaleX(0);
    z-index: 1000;
    animation: progress-bar linear;
    animation-timeline: scroll();
    animation-duration: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress {
    animation: none;
    transform: scaleX(1);
  }
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Code Example: View-Driven Reveal Animations</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
@keyframes slide-up-fade {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal-card {
  opacity: 0;
  animation: slide-up-fade ease-out both;
  animation-timeline: view();
  animation-range: entry 0% entry 100%;
}

/* Stagger children */
.reveal-card:nth-child(1) { animation-range: entry 0% entry 80%; }
.reveal-card:nth-child(2) { animation-range: entry 5% entry 85%; }
.reveal-card:nth-child(3) { animation-range: entry 10% entry 90%; }
.reveal-card:nth-child(4) { animation-range: entry 15% entry 95%; }
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Code Example: Scroll-Driven Parallax with Custom Properties</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
@property --parallax-offset {
  syntax: '&lt;length&gt;';
  initial-value: 0px;
  inherits: false;
}

@keyframes parallax-scroll {
  from { --parallax-offset: -100px; }
  to { --parallax-offset: 100px; }
}

.parallax-layer {
  animation: parallax-scroll linear;
  animation-timeline: scroll();
  transform: translateY(var(--parallax-offset));
}

.parallax-layer.slow {
  --parallax-offset: -50px;
  animation-range: 0% 100%;
}

.parallax-layer.fast {
  --parallax-offset: -150px;
  animation-range: 0% 100%;
}

.parallax-hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.parallax-bg {
  position: absolute;
  inset: -20%;
  background: url('hero-bg.jpg') center/cover;
  animation: parallax-scroll linear;
  animation-timeline: scroll();
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Step-by-Step: Infinite Scroll with View-Driven Animations</h2>
<p>Combine the Intersection Observer API for data loading with CSS view-driven animations for smooth content reveals in an infinite scroll feed.</p>
<h3>Step 1: Set Up the Scroll Container Structure</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
&lt;main class="feed-container"&gt;
  &lt;div class="scroll-progress"&gt;&lt;/div&gt;
  &lt;section id="feed" class="feed"&gt;
    &lt;!-- Feed items injected here --&gt;
  &lt;/section&gt;
  &lt;div id="sentinel" class="sentinel"&gt;
    &lt;div class="loading-indicator"&gt;Loading more...&lt;/div&gt;
  &lt;/div&gt;
&lt;/main&gt;

&lt;style&gt;
.feed-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.feed {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
&lt;/style&gt;
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 2: Define the View-Driven Entry Animation</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
@keyframes feed-item-enter {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@supports (animation-timeline: view()) {
  .feed-item {
    animation: feed-item-enter ease-out both;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
  }

  .feed-item .feed-image {
    animation: feed-item-enter ease-out both;
    animation-timeline: view();
    animation-range: entry 10% entry 90%;
  }

  .feed-item .feed-content {
    animation: feed-item-enter ease-out both;
    animation-timeline: view();
    animation-range: entry 20% entry 80%;
  }
}

@supports not (animation-timeline: view()) {
  .feed-item {
    opacity: 1;
  }
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 3: Create the Feed Item Renderer</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
function createFeedItem(post) {
  const article = document.createElement('article');
  article.className = 'feed-item';
  article.dataset.id = post.id;

  article.innerHTML = \`
    &lt;div class="feed-image"&gt;
      &lt;img src="\${post.image}" alt="\${post.title}" loading="lazy" /&gt;
    &lt;/div&gt;
    &lt;div class="feed-content"&gt;
      &lt;span class="feed-category"&gt;\${post.category}&lt;/span&gt;
      &lt;h2&gt;\${post.title}&lt;/h2&gt;
      &lt;p&gt;\${post.excerpt}&lt;/p&gt;
      &lt;div class="feed-meta"&gt;
        &lt;time&gt;\${post.date}&lt;/time&gt;
        &lt;span&gt;\${post.readTime}&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  \`;

  return article;
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 4: Implement the Infinite Scroll Loader</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class InfiniteFeed {
  constructor(containerSelector, sentinelSelector) {
    this.container = document.querySelector(containerSelector);
    this.sentinel = document.querySelector(sentinelSelector);
    this.page = 0;
    this.pageSize = 6;
    this.loading = false;
    this.hasMore = true;

    this.observer = new IntersectionObserver(
      (entries) =&gt; {
        if (entries[0].isIntersecting &amp;&amp; !this.loading &amp;&amp; this.hasMore) {
          this.loadPosts();
        }
      },
      { rootMargin: '300px' }
    );

    this.observer.observe(this.sentinel);
  }

  async loadPosts() {
    this.loading = true;
    this.sentinel.classList.add('active');

    try {
      const response = await fetch(
        \`/api/posts?page=\${this.page}&amp;size=\${this.pageSize}\`
      );
      const { posts, hasMore } = await response.json();

      posts.forEach((post) =&gt; {
        const item = createFeedItem(post);
        this.container.appendChild(item);
      });

      this.page++;
      this.hasMore = hasMore;

      if (!hasMore) {
        this.sentinel.innerHTML = '&lt;p class="end-message"&gt;You have reached the end&lt;/p&gt;';
        this.observer.disconnect();
      }
    } catch (error) {
      this.sentinel.innerHTML = \`
        &lt;button onclick="feed.loadPosts()"&gt;
          Failed to load. Click to retry.
        &lt;/button&gt;
      \`;
    } finally {
      this.loading = false;
      this.sentinel.classList.remove('active');
    }
  }
}

const feed = new InfiniteFeed('#feed', '#sentinel');
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 5: Add Scroll-Triggered Category Filters</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
@keyframes filter-bar-sticky {
  from { background: transparent; box-shadow: none; }
  to { background: rgba(255,255,255,0.95); box-shadow: 0 2px 20px rgba(0,0,0,0.1); }
}

.filter-bar {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 1rem;
  backdrop-filter: blur(10px);
  animation: filter-bar-sticky linear both;
  animation-timeline: scroll();
  animation-range: 0px 200px;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 6: Implement Skeleton Loading with Animation</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

.skeleton-image {
  height: 200px;
  margin-bottom: 1rem;
}

.skeleton-title {
  height: 24px;
  width: 70%;
  margin-bottom: 0.5rem;
}

.skeleton-text {
  height: 16px;
  width: 100%;
  margin-bottom: 0.25rem;
}

function createSkeleton() {
  const skeleton = document.createElement('div');
  skeleton.className = 'feed-item skeleton-item';
  skeleton.innerHTML = \`
    &lt;div class="skeleton skeleton-image"&gt;&lt;/div&gt;
    &lt;div class="skeleton skeleton-title"&gt;&lt;/div&gt;
    &lt;div class="skeleton skeleton-text"&gt;&lt;/div&gt;
    &lt;div class="skeleton skeleton-text"&gt;&lt;/div&gt;
  \`;
  return skeleton;
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 7: Add Performance Monitoring</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
function monitorScrollPerformance() {
  let lastTime = performance.now();
  let frameCount = 0;
  let fps = 60;

  function measure() {
    frameCount++;
    const now = performance.now();
    if (now - lastTime &gt;= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastTime = now;

      if (fps &lt; 30) {
        document.body.classList.add('low-fps');
        console.warn(\`Low FPS detected: \${fps}\`);
      } else {
        document.body.classList.remove('low-fps');
      }
    }
    requestAnimationFrame(measure);
  }

  requestAnimationFrame(measure);
}

monitorScrollPerformance();

/* CSS fallback for low FPS devices */
.low-fps .feed-item {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Conclusion</h2>
<p>CSS scroll-driven animations eliminate the performance penalty of JavaScript-based scroll effects by leveraging the browser's compositor thread. The <code>view()</code> timeline makes element-reveal animations trivial to implement, while the <code>scroll()</code> timeline enables creative effects like parallax and progress indicators. Combined with Intersection Observer for data loading in infinite scroll patterns, these APIs let you build immersive, performant content feeds that feel native and responsive. Adopt <code>@supports</code> queries and reduced-motion alternatives to ensure graceful degradation across all browsers and user preferences.</p>`
  },
  {
    id: 24,
    slug: "progressive-web-apps-2026-offline-first",
    category: "Web Development",
    title: "Progressive Web Apps 2026: Building Offline-First Experiences",
    keyword: "progressive web apps 2026",
    date: "2026-03-25",
    readTime: "15 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Build resilient offline-first PWAs in 2026 using advanced service worker strategies, background sync, and the latest browser APIs for reliable experiences.",
    content: `<h2>Introduction</h2>
<p>Progressive web apps in 2026 have matured into a first-class application platform. With broad support for service workers, the Background Sync API, periodic background sync, and the File System Access API, PWAs now deliver experiences that rival native applications. The offline-first paradigm — where the application works fully without a network connection and syncs when connectivity returns — has become the gold standard for reliability, especially in regions with inconsistent network coverage and for applications where data availability is critical.</p>
<p>The key to building effective offline-first PWAs lies in intelligent caching strategies. Different types of content require different approaches: application shells benefit from cache-first strategies, API data needs network-first with fallback approaches, and static assets are best served with stale-while-revalidate patterns. Service workers act as the programmable proxy that makes all of this possible, intercepting network requests and serving cached responses when appropriate.</p>
<p>This guide covers the complete stack for building offline-first PWAs in 2026. We explore Workbox for service worker management, IndexedDB for client-side data persistence, background synchronization for deferred writes, and the emerging APIs that make PWAs more capable than ever. Each section includes production-ready code examples and best practices drawn from real-world applications.</p>

<h2>Best Practices for Offline-First PWAs</h2>
<ul>
<li><strong>Implement a robust caching strategy hierarchy.</strong> Use cache-first for static assets (JS, CSS, images, fonts), network-first for API data that changes frequently, stale-while-revalidate for semi-static content like blog posts, and cache-only for the offline fallback page. Match strategies to content types for optimal performance and freshness.</li>
<li><strong>Use IndexedDB for structured offline data.</strong> Cache API is ideal for HTTP responses, but structured application data belongs in IndexedDB. Use a library like Dexie.js to simplify IndexedDB operations and implement a data access layer that abstracts the storage mechanism from your application logic.</li>
<li><strong>Implement background sync for deferred operations.</strong> When users perform write actions while offline (submitting forms, creating records, uploading files), queue these operations using the Background Sync API. The browser will retry them automatically when connectivity is restored, providing a seamless experience.</li>
<li><strong>Version your caches explicitly.</strong> Use versioned cache names (e.g., <code>app-shell-v3</code>) and delete old caches during the service worker activate event. This ensures users always get the latest assets without manual cache clearing and prevents storage bloat from accumulated cache versions.</li>
<li><strong>Provide clear offline indicators.</strong> Users need to know when they are offline and what functionality is available. Display a persistent offline banner, disable actions that require network connectivity, and show sync status for pending operations. Transparency prevents user confusion and frustration.</li>
<li><strong>Test offline scenarios rigorously.</strong> Use Chrome DevTools' offline simulation, throttle network conditions, and test with actual airplane mode on real devices. Verify that all critical user flows work offline: navigation, data viewing, form submission, and sync recovery when coming back online.</li>
<li><strong>Monitor service worker lifecycle events.</strong> Handle install, activate, and update events properly. Use skipWaiting and clients.claim() for immediate updates, or implement a user-prompted update flow for applications where abrupt updates could disrupt ongoing work.</li>
<li><strong>Set appropriate cache size limits.</strong> Browsers enforce storage quotas (typically 50-80% of available disk space per origin). Use the Storage API to estimate usage and quota, implement cache eviction strategies for least-recently-used content, and request persistent storage for critical applications.</li>
</ul>

<h2>Code Example: Workbox Service Worker Configuration</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
// sw.js - Service Worker with Workbox
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

// Precache application shell
precacheAndRoute(self.__WB_MANIFEST);

// Cache app shell with cache-first
registerRoute(
  ({ request }) =&gt; request.mode === 'navigate',
  new CacheFirst({
    cacheName: 'pages-v2',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 30 * 24 * 60 * 60 })
    ]
  })
);

// Cache static assets
registerRoute(
  ({ request }) =&gt; ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'static-assets-v2',
    plugins: [
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 60 * 24 * 60 * 60 })
    ]
  })
);

// Cache images
registerRoute(
  ({ request }) =&gt; request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-v2',
    plugins: [
      new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 90 * 24 * 60 * 60 })
    ]
  })
);

// Network-first for API calls
registerRoute(
  ({ url }) =&gt; url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache-v2',
    networkTimeoutSeconds: 5,
    plugins: [
      new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 24 * 60 * 60 })
    ]
  })
);

// Background sync for POST requests
const bgSyncPlugin = new BackgroundSyncPlugin('postQueue', {
  maxRetentionTime: 24 * 60
});

registerRoute(
  ({ url, request }) =&gt;
    url.pathname.startsWith('/api/') &amp;&amp; request.method === 'POST',
  new NetworkFirst({
    plugins: [bgSyncPlugin]
  }),
  'POST'
);
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Code Example: IndexedDB Data Layer with Dexie.js</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
import Dexie from 'dexie';

const db = new Dexie('AppDatabase');

db.version(1).stores({
  posts: '++id, title, category, date, *tags',
  syncQueue: '++id, action, endpoint, payload, createdAt',
  metadata: 'key'
});

class OfflineDataStore {
  async savePosts(posts) {
    await db.posts.bulkPut(posts);
  }

  async getPosts(page = 0, size = 10) {
    const offset = page * size;
    return await db.posts
      .orderBy('date')
      .reverse()
      .offset(offset)
      .limit(size)
      .toArray();
  }

  async queueSync(action, endpoint, payload) {
    await db.syncQueue.add({
      action,
      endpoint,
      payload: JSON.stringify(payload),
      createdAt: new Date().toISOString()
    });
  }

  async processSyncQueue() {
    const pending = await db.syncQueue.toArray();
    const processed = [];

    for (const item of pending) {
      try {
        await fetch(item.endpoint, {
          method: item.action,
          headers: { 'Content-Type': 'application/json' },
          body: item.payload
        });
        processed.push(item.id);
      } catch (error) {
        console.warn('Sync failed for item:', item.id, error);
      }
    }

    if (processed.length) {
      await db.syncQueue.bulkDelete(processed);
    }

    return processed.length;
  }

  async getPendingCount() {
    return await db.syncQueue.count();
  }
}

export const store = new OfflineDataStore();
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Step-by-Step: Infinite Scroll with Offline-First Caching</h2>
<p>Build an infinite scroll feed that works seamlessly offline by combining cached data with background synchronization.</p>
<h3>Step 1: Set Up the Offline-Aware Feed Component</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class OfflineInfiniteFeed {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.page = 0;
    this.pageSize = 10;
    this.loading = false;
    this.hasMore = true;
    this.isOnline = navigator.onLine;

    window.addEventListener('online', () =&gt; {
      this.isOnline = true;
      this.hideOfflineBanner();
      this.syncPendingData();
    });

    window.addEventListener('offline', () =&gt; {
      this.isOnline = false;
      this.showOfflineBanner();
    });

    this.setupIntersectionObserver();
    this.loadInitialData();
  }

  setupIntersectionObserver() {
    const sentinel = document.createElement('div');
    sentinel.id = 'feed-sentinel';
    this.container.appendChild(sentinel);

    this.observer = new IntersectionObserver(
      (entries) =&gt; {
        if (entries[0].isIntersecting &amp;&amp; !this.loading) {
          this.loadNextPage();
        }
      },
      { rootMargin: '400px' }
    );
    this.observer.observe(sentinel);
  }
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 2: Implement Network-First Data Loading with Cache Fallback</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
async loadNextPage() {
  this.loading = true;
  this.showLoader();

  try {
    let posts;
    if (this.isOnline) {
      posts = await this.fetchFromNetwork();
      await store.savePosts(posts);
    } else {
      posts = await this.fetchFromCache();
    }

    if (posts.length === 0) {
      this.hasMore = false;
      this.showEndOfContent();
      return;
    }

    this.renderPosts(posts);
    this.page++;
  } catch (error) {
    const cachedPosts = await this.fetchFromCache();
    if (cachedPosts.length &gt; 0) {
      this.renderPosts(cachedPosts);
      this.showOfflineIndicator();
    } else {
      this.showError('No cached data available. Connect to load content.');
    }
  } finally {
    this.loading = false;
    this.hideLoader();
  }
}

async fetchFromNetwork() {
  const response = await fetch(
    \`/api/posts?page=\${this.page}&amp;size=\${this.pageSize}\`
  );
  if (!response.ok) throw new Error('Network request failed');
  const data = await response.json();
  return data.posts;
}

async fetchFromCache() {
  return await store.getPosts(this.page, this.pageSize);
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 3: Create the Offline-Aware Post Renderer</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
renderPosts(posts) {
  const sentinel = document.getElementById('feed-sentinel');

  posts.forEach((post, index) =&gt; {
    const article = document.createElement('article');
    article.className = 'feed-post';
    article.style.animationDelay = \`\${index * 0.1}s\`;

    const syncStatus = post._pendingSync
      ? '&lt;span class="sync-badge pending"&gt;Pending sync&lt;/span&gt;'
      : '';

    article.innerHTML = \`
      &lt;div class="post-header"&gt;
        &lt;span class="post-category"&gt;\${post.category}&lt;/span&gt;
        \${syncStatus}
      &lt;/div&gt;
      &lt;h2&gt;\${post.title}&lt;/h2&gt;
      &lt;p&gt;\${post.excerpt}&lt;/p&gt;
      &lt;div class="post-meta"&gt;
        &lt;time&gt;\${post.date}&lt;/time&gt;
        &lt;span&gt;\${post.readTime}&lt;/span&gt;
      &lt;/div&gt;
      &lt;button class="save-offline-btn" data-id="\${post.id}"&gt;
        Save for offline
      &lt;/button&gt;
    \`;

    this.container.insertBefore(article, sentinel);
  });
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 4: Implement the Offline Banner and Sync Status</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
showOfflineBanner() {
  let banner = document.getElementById('offline-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.className = 'offline-banner';
    document.body.prepend(banner);
  }
  banner.innerHTML = \`
    &lt;span&gt;You are offline. Some features may be limited.&lt;/span&gt;
    &lt;button onclick="feed.syncPendingData()"&gt;Retry&lt;/button&gt;
  \`;
  banner.classList.add('visible');
}

hideOfflineBanner() {
  const banner = document.getElementById('offline-banner');
  if (banner) banner.classList.remove('visible');
}

async syncPendingData() {
  const count = await store.getPendingCount();
  if (count === 0) return;

  this.showSyncStatus(\`Syncing \${count} pending changes...\`);
  const synced = await store.processSyncQueue();
  this.showSyncStatus(\`Synced \${synced} changes\`);
  setTimeout(() =&gt; this.hideSyncStatus(), 3000);
}

showSyncStatus(message) {
  const status = document.getElementById('sync-status') ||
    Object.assign(document.createElement('div'), {
      id: 'sync-status',
      className: 'sync-status'
    });
  status.textContent = message;
  status.classList.add('visible');
  document.body.appendChild(status);
}

hideSyncStatus() {
  const status = document.getElementById('sync-status');
  if (status) status.classList.remove('visible');
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 5: Handle Offline Form Submissions</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
async handleFormSubmit(formData) {
  const endpoint = '/api/posts';
  const payload = {
    title: formData.get('title'),
    content: formData.get('content'),
    category: formData.get('category')
  };

  if (this.isOnline) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const savedPost = await response.json();
      await store.savePosts([savedPost]);
      this.prependPost(savedPost);
      return { success: true, synced: true };
    } catch (error) {
      await store.queueSync('POST', endpoint, payload);
      return { success: true, synced: false, queued: true };
    }
  } else {
    const tempPost = {
      ...payload,
      id: \`temp-\${Date.now()}\`,
      date: new Date().toISOString(),
      _pendingSync: true
    };
    await store.savePosts([tempPost]);
    await store.queueSync('POST', endpoint, payload);
    this.prependPost(tempPost);
    return { success: true, synced: false, queued: true };
  }
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 6: Implement Cache Eviction Strategy</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class CacheManager {
  constructor(maxSizeMB = 50) {
    this.maxSize = maxSizeMB * 1024 * 1024;
  }

  async checkStorage() {
    if ('storage' in navigator &amp;&amp; 'estimate' in navigator.storage) {
      const { usage, quota } = await navigator.storage.estimate();
      const percentUsed = (usage / quota) * 100;

      if (percentUsed &gt; 80) {
        await this.evictOldEntries();
      }

      return { usage, quota, percentUsed };
    }
    return null;
  }

  async evictOldEntries() {
    const cacheNames = await caches.keys();
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      const sorted = keys.sort((a, b) =&gt; {
        const dateA = new Date(a.headers?.get('date') || 0);
        const dateB = new Date(b.headers?.get('date') || 0);
        return dateA - dateB;
      });

      const toDelete = Math.floor(sorted.length * 0.2);
      for (let i = 0; i &lt; toDelete; i++) {
        await cache.delete(sorted[i]);
      }
    }
  }

  async requestPersistence() {
    if ('storage' in navigator &amp;&amp; 'persist' in navigator.storage) {
      const granted = await navigator.storage.persist();
      console.log('Persistent storage:', granted);
      return granted;
    }
    return false;
  }
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 7: Register and Update the Service Worker</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class ServiceWorkerManager {
  constructor() {
    this.registration = null;
  }

  async register() {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service workers not supported');
      return;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      this.registration.addEventListener('updatefound', () =&gt; {
        const newWorker = this.registration.installing;
        newWorker.addEventListener('statechange', () =&gt; {
          if (newWorker.state === 'installed' &amp;&amp; navigator.serviceWorker.controller) {
            this.showUpdatePrompt();
          }
        });
      });

      console.log('Service worker registered');
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }

  showUpdatePrompt() {
    const prompt = document.createElement('div');
    prompt.className = 'update-prompt';
    prompt.innerHTML = \`
      &lt;p&gt;A new version is available.&lt;/p&gt;
      &lt;button onclick="swManager.applyUpdate()"&gt;Update&lt;/button&gt;
      &lt;button onclick="this.parentElement.remove()"&gt;Later&lt;/button&gt;
    \`;
    document.body.appendChild(prompt);
  }

  async applyUpdate() {
    if (this.registration?.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }
}

const swManager = new ServiceWorkerManager();
swManager.register();
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Conclusion</h2>
<p>Building offline-first PWAs in 2026 requires a thoughtful combination of service worker caching strategies, client-side data persistence, and background synchronization. The patterns in this guide — network-first loading with cache fallback, queued offline operations, and intelligent cache management — create applications that feel fast and reliable regardless of network conditions. Start with Workbox for service worker management, use IndexedDB for structured data, and always provide clear feedback about connectivity status and sync progress. The result is an application that earns user trust through consistent availability.</p>`
  },
  {
    id: 25,
    slug: "web-performance-optimization-core-web-vitals",
    category: "Web Development",
    title: "Web Performance Optimization: Core Web Vitals Mastery",
    keyword: "web performance optimization",
    date: "2026-03-28",
    readTime: "14 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Master Core Web Vitals optimization techniques including LCP, INP, and CLS with practical strategies that deliver measurable performance improvements.",
    content: `<h2>Introduction</h2>
<p>Web performance optimization in 2026 is anchored by three Core Web Vitals: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). These metrics directly impact search rankings, user engagement, and conversion rates. Google's ranking systems weight these signals heavily, making performance optimization a business-critical concern rather than a purely technical exercise.</p>
<p>Optimizing Core Web Vitals requires a systematic approach. LCP concerns the loading performance of your largest above-the-fold element. INP measures the responsiveness of all user interactions throughout the page lifecycle. CLS quantifies visual stability by tracking unexpected layout shifts. Each metric has distinct root causes and optimization strategies.</p>
<p>This guide provides a comprehensive, actionable framework for measuring and optimizing all three Core Web Vitals. We cover real-user monitoring with the web-vitals library, server-side optimizations, client-side techniques, and an infinite scroll implementation designed to maintain excellent scores as content loads dynamically.</p>

<h2>Best Practices for Core Web Vitals Optimization</h2>
<ul>
<li><strong>Measure with real user data, not just lab tools.</strong> Lab tools like Lighthouse provide useful diagnostics, but Core Web Vitals are evaluated based on field data from the Chrome User Experience Report. Use the web-vitals library to collect real user measurements and identify which segments of your audience experience poor performance.</li>
<li><strong>Optimize LCP by prioritizing the hero element.</strong> Identify the largest contentful paint element and ensure it loads as fast as possible. Use fetchpriority="high", preconnect to required origins, inline critical CSS, and eliminate render-blocking resources above the hero element.</li>
<li><strong>Improve INP by breaking up long tasks.</strong> Long JavaScript tasks block the main thread and delay interaction responsiveness. Use the scheduler.yield() API, break work into smaller chunks with setTimeout or requestIdleCallback, and move heavy computation to Web Workers. Target main thread tasks under 50ms.</li>
<li><strong>Prevent CLS by always setting dimensions.</strong> Every image, video, ad slot, and dynamic content area must have explicit width and height attributes or CSS aspect-ratio. Use CSS contain-intrinsic-size for elements that load content lazily. Reserve space for dynamically injected content like cookie banners and chat widgets.</li>
<li><strong>Implement resource hints strategically.</strong> Use preconnect for critical third-party origins, preload for above-the-fold resources identified by Lighthouse, prefetch for likely next-page resources, and dns-prefetch for origins you will connect to later.</li>
<li><strong>Optimize font loading to prevent CLS and improve LCP.</strong> Use font-display: swap for text fonts, preload critical font files, and use the CSS size-adjust property to create metric-compatible fallback fonts that eliminate layout shift when custom fonts load.</li>
<li><strong>Monitor INP breakdown by phase.</strong> INP consists of input delay, processing time, and presentation delay. Use the PerformanceObserver API with the 'event' type to identify which phase contributes most to slow interactions, then optimize that specific phase.</li>
<li><strong>Use content-visibility for off-screen content.</strong> The CSS content-visibility: auto property tells the browser to skip rendering work for content that is not yet visible. Combined with contain-intrinsic-size, this dramatically reduces initial rendering cost for long pages and infinite scroll feeds.</li>
</ul>

<h2>Code Example: Measuring Core Web Vitals</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    url: window.location.href,
    timestamp: Date.now()
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/vitals', body);
  } else {
    fetch('/api/vitals', { method: 'POST', body, keepalive: true });
  }
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Code Example: Optimizing LCP with Resource Hints</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
&lt;link rel="preconnect" href="https://fonts.googleapis.com" crossorigin /&gt;
&lt;link rel="preload" href="/hero-image.webp" as="image" fetchpriority="high" /&gt;
&lt;link rel="preload" href="/critical.css" as="style" /&gt;

&lt;style&gt;
  .hero { min-height: 60vh; display: flex; align-items: center; }
  .hero-image { width: 100%; height: auto; aspect-ratio: 16/9; object-fit: cover; }
&lt;/style&gt;

&lt;section class="hero"&gt;
  &lt;img src="/hero-image.webp" alt="Hero" width="1200" height="675"
       fetchpriority="high" decoding="async" /&gt;
&lt;/section&gt;

&lt;link rel="preload" href="/non-critical.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'" /&gt;
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Code Example: Breaking Up Long Tasks for INP</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;
function yieldToMain() {
  return new Promise(resolve =&gt; {
    if (typeof scheduler?.yield === 'function') {
      scheduler.yield().then(resolve);
    } else {
      setTimeout(resolve, 0);
    }
  });
}

async function processInChunks(items, chunkSize = 50) {
  const results = [];
  for (let i = 0; i &lt; items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    results.push(...chunk.map(processItem));
    await yieldToMain();
  }
  return results;
}

class PerformantSearch {
  constructor(inputEl, resultsEl) {
    this.input = inputEl;
    this.results = resultsEl;
    this.input.addEventListener('input', (e) =&gt; {
      this.debouncedSearch(e.target.value);
    });
  }

  debouncedSearch = debounce(async (query) =&gt; {
    const response = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
    const data = await response.json();
    await yieldToMain();
    this.renderResults(data.items);
  }, 300);
}

function debounce(fn, delay) {
  let timer;
  return (...args) =&gt; {
    clearTimeout(timer);
    timer = setTimeout(() =&gt; fn(...args), delay);
  };
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Step-by-Step: Infinite Scroll with Core Web Vitals Optimization</h2>
<p>Implement infinite scroll that maintains excellent LCP, INP, and CLS scores as new content loads dynamically.</p>
<h3>Step 1: Set Up Dimension-Reserved Content Container</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
&lt;style&gt;
.feed-container { max-width: 800px; margin: 0 auto; }
.feed-item { margin-bottom: 2rem; contain: layout style; }
.feed-item-image { aspect-ratio: 16/9; width: 100%; height: auto; object-fit: cover; background: #f0f0f0; }
.feed-item-content { min-height: 120px; }
.skeleton { background: #f0f0f0; animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
&lt;/style&gt;

&lt;div id="feed" class="feed-container" role="feed"&gt;&lt;/div&gt;
&lt;div id="sentinel" class="sentinel"&gt;&lt;/div&gt;
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 2: Create CLS-Safe Skeleton Loaders</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
function createSkeletonItem() {
  const skeleton = document.createElement('article');
  skeleton.className = 'feed-item skeleton-item';
  skeleton.setAttribute('aria-hidden', 'true');
  skeleton.innerHTML = \`
    &lt;div class="feed-item-image skeleton"&gt;&lt;/div&gt;
    &lt;div class="feed-item-content"&gt;
      &lt;div class="skeleton" style="height:16px;width:80px;margin-bottom:8px"&gt;&lt;/div&gt;
      &lt;div class="skeleton" style="height:28px;width:90%;margin-bottom:8px"&gt;&lt;/div&gt;
      &lt;div class="skeleton" style="height:16px;width:100%;margin-bottom:4px"&gt;&lt;/div&gt;
      &lt;div class="skeleton" style="height:16px;width:75%"&gt;&lt;/div&gt;
    &lt;/div&gt;
  \`;
  return skeleton;
}

function showSkeletons(container, count = 3) {
  const sentinel = document.getElementById('sentinel');
  for (let i = 0; i &lt; count; i++) {
    container.insertBefore(createSkeletonItem(), sentinel);
  }
}

function removeSkeletons(container) {
  container.querySelectorAll('.skeleton-item').forEach(el =&gt; el.remove());
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 3: Implement LCP-Optimized Image Loading</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
function createOptimizedImage(post, index) {
  const img = document.createElement('img');
  img.className = 'feed-item-image';
  img.alt = post.title;
  img.width = 800;
  img.height = 450;

  if (index === 0) {
    img.fetchPriority = 'high';
    img.loading = 'eager';
  } else {
    img.loading = 'lazy';
    img.decoding = 'async';
  }
  img.src = post.image;

  if (post.imageSrcSet) {
    img.srcset = post.imageSrcSet;
    img.sizes = '(max-width: 800px) 100vw, 800px';
  }

  return img;
}
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 4: Build INP-Aware Scroll Loader</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class PerformantInfiniteScroll {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.page = 0;
    this.loading = false;
    this.hasMore = true;

    this.observer = new IntersectionObserver(
      (entries) =&gt; {
        if (entries[0].isIntersecting &amp;&amp; !this.loading) {
          this.loadPosts();
        }
      },
      { rootMargin: '500px' }
    );
    this.observer.observe(document.getElementById('sentinel'));
  }

  async loadPosts() {
    this.loading = true;
    showSkeletons(this.container, 3);

    try {
      const response = await fetch(\`/api/posts?page=\${this.page}&amp;size=6\`);
      const { posts, hasMore } = await response.json();
      removeSkeletons(this.container);
      await this.renderChunked(posts, 2);
      this.page++;
      this.hasMore = hasMore;
      if (!hasMore) this.observer.disconnect();
    } catch (error) {
      removeSkeletons(this.container);
    } finally {
      this.loading = false;
    }
  }

  async renderChunked(posts, perFrame) {
    for (let i = 0; i &lt; posts.length; i += perFrame) {
      const chunk = posts.slice(i, i + perFrame);
      const fragment = document.createDocumentFragment();
      chunk.forEach((post, idx) =&gt; {
        fragment.appendChild(this.createFeedItem(post, i + idx));
      });
      document.getElementById('sentinel').before(fragment);
      await new Promise(resolve =&gt; requestAnimationFrame(resolve));
    }
  }

  createFeedItem(post, index) {
    const article = document.createElement('article');
    article.className = 'feed-item';
    const image = createOptimizedImage(post, index);
    article.innerHTML = \`&lt;div class="feed-item-content"&gt;
      &lt;span class="category"&gt;\${post.category}&lt;/span&gt;
      &lt;h2&gt;\${post.title}&lt;/h2&gt;
      &lt;p&gt;\${post.excerpt}&lt;/p&gt;
    &lt;/div&gt;\`;
    article.prepend(image);
    return article;
  }
}

const scroll = new PerformantInfiniteScroll('feed');
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 5: Add content-visibility for Off-Screen Items</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
.feed-item {
  contain: layout style paint;
  content-visibility: auto;
  contain-intrinsic-size: auto 500px;
}
.feed-item:nth-child(-n+3) { content-visibility: visible; }
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 6: Monitor and Report Vitals in Real-Time</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class VitalsMonitor {
  constructor() {
    this.metrics = {};
    new PerformanceObserver((list) =&gt; {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          this.recordMetric('LCP', entry.startTime);
        }
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    new PerformanceObserver((list) =&gt; {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput &amp;&amp; entry.value &gt; 0.1) {
          this.recordMetric('CLS', entry.value);
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
  }

  recordMetric(name, value) {
    this.metrics[name] = value;
    const thresholds = { LCP: 4000, INP: 500, CLS: 0.25 };
    if (value &gt; thresholds[name]) console.warn(\`Poor \${name}: \${value}\`);
  }
}
new VitalsMonitor();
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h3>Step 7: Prefetch Next Page During Idle Time</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;
class SmartPrefetcher {
  constructor() { this.cache = new Map(); this.prefetchedPages = new Set(); }
  prefetchNextPage(page) {
    if (this.prefetchedPages.has(page)) return;
    const doFetch = async () =&gt; {
      try {
        const response = await fetch(\`/api/posts?page=\${page}&amp;size=6\`);
        const data = await response.json();
        this.cache.set(page, data);
        this.prefetchedPages.add(page);
      } catch (err) { /* silent fail */ }
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(doFetch, { timeout: 2000 });
    } else {
      setTimeout(doFetch, 100);
    }
  }
}
const prefetcher = new SmartPrefetcher();
&lt;/code&gt;&lt;/pre&gt;
</code></pre>

<h2>Conclusion</h2>
<p>Core Web Vitals optimization is an ongoing discipline, not a one-time fix. The strategies in this guide — dimension-reserved layouts to prevent CLS, chunked rendering and scheduler.yield for INP, and resource prioritization for LCP — provide a solid foundation for excellent performance. Measure continuously with real user data, prioritize the metrics where you are furthest from the "good" threshold, and iterate based on actual CrUX field data.</p>`
  }
];

export default blogPosts3;