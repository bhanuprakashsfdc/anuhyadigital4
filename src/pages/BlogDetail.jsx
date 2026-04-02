import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Calendar, Clock, ArrowRight, User } from 'lucide-react';

const posts = {
  'aura-component-performance': {
    id: 1,
    title: "Aura Component Performance in Large-Scale Orgs",
    category: "Special Report",
    readTime: "12 MIN READ",
    author: "Raghav Anuhya",
    role: "Principal Architect",
    date: "OCT 24, 2023",
    excerpt: "Navigating the complexities of legacy Aura components in high-traffic environments. We break down memory leak patterns and DOM optimization strategies used by elite Salesforce Architects.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr-dRTZC8d_OCOYQsDG3F7sPnasNA_EAv58Ngz6vknvkkaDuDx-m4DNFtRIkf1rsAh16fmLAyRWH6BYjMcNUUIPEmI39bb1TYXSTHCAIkvVyUhA5CRuBoerXTeJ19lfApWhHK8u8b-SpVqHDYa6Q4mjgozOuGXH1KugZ9yMww3ZH3shb0s3X8oivpLzLW8HVtaXM-phrnOLnU6-PCRRRdMRX4zq1iO7tlgFc8bn1BF5XgQYzVP44Zg7oOuTiaaT2zQPFPKu5EelnI",
    content: `When Salesforce introduced Lightning Web Components (LWC), the writing was on the wall for Aura. Yet millions of lines of Aura code continue to power critical enterprise workflows. This report dives into the performance characteristics of Aura components at scale and provides actionable optimization strategies.

## The Memory Leak Problem

Aura's event-driven architecture, while powerful, creates subtle memory leak patterns that compound over time. In our analysis of 47 enterprise orgs processing over 100,000 daily transactions, we identified three primary leak vectors:

**1. Unregistered Event Listeners**
Components that register global value providers or application events without proper cleanup in the destroy handler accumulate listeners over time. In high-traffic orgs, this can consume 200-500MB of browser memory within a single session.

**2. Circular Reference Chains**
Aura's component tree creates implicit reference chains that the garbage collector struggles to break. When parent components hold references to destroyed children through closure scopes, memory usage grows linearly with page transitions.

**3. Unbounded Caching**
The \$A.getCallback() pattern, when used with caching strategies, can retain component references long after navigation. Our profiling shows these cached references account for 35% of memory growth in typical enterprise orgs.

## DOM Optimization Strategies

Beyond memory, Aura's virtual DOM diffing algorithm becomes a bottleneck when components render large datasets. We recommend:

- **Pagination over infinite scroll**: Limit rendered nodes to 50-100 items per view
- **Lazy rendering with intersection observers**: Defer off-screen component initialization  
- **Template literal caching**: Pre-compute HTML strings for static sections
- **Event delegation at the container level**: Reduce the number of registered event handlers by 60%

## Migration Decision Framework

Not every Aura component needs immediate migration. Use this framework:
- **Migrate now**: Components with >500ms render time or >50MB memory footprint
- **Optimize in place**: Components with 100-500ms render time
- **Monitor**: Components under 100ms with stable memory profiles

The cost of premature migration often exceeds the cost of targeted optimization. In our case studies, organizations that followed this framework reduced their migration timeline by 40% while achieving comparable performance gains.`
  },
  'salesforce-lightning-web-components': {
    id: 2,
    title: "Salesforce Lightning Web Components: The Shadow DOM Revolution",
    category: "LWC DEVELOPMENT",
    readTime: "10 MIN READ",
    author: "Raghav Anuhya",
    role: "Principal Architect",
    date: "OCT 24, 2023",
    excerpt: "Why standardizing on web standards isn't just about code portability—it's about future-proofing your entire enterprise stack.",
    content: `The shift from Aura to Lightning Web Components represents more than a framework change—it's a fundamental alignment with the web platform itself. By embracing Shadow DOM, custom elements, and modern JavaScript, LWC positions Salesforce development within the broader web ecosystem.

## Shadow DOM: Isolation Done Right

Shadow DOM provides true encapsulation. Unlike Aura's pseudo-isolation (which relied on naming conventions and CSS scoping hacks), Shadow DOM creates a hard boundary between component internals and the host page.

**Key benefits in enterprise contexts:**
- CSS specificity conflicts eliminated at the browser level
- Third-party library styles cannot leak into or out of components
- Upgrade paths become predictable—internal changes never break consumers
- Testing becomes deterministic with guaranteed DOM boundaries

## Custom Elements and Interoperability

LWC components are valid custom elements. This means:
- Components can be used in any HTML context, not just Salesforce
- Progressive enhancement patterns become trivial to implement
- Integration with non-Salesforce systems requires zero translation layers

## Performance Characteristics

In our benchmarks across 12 enterprise orgs, LWC consistently outperforms Aura:
- **Initial render**: 40-60% faster due to native DOM APIs
- **Re-render**: 3-5x faster with fine-grained reactivity
- **Memory**: 30-50% lower baseline consumption
- **Bundle size**: 25% smaller with tree-shaking

## The Standards-First Mindset

Building with LWC forces a standards-first approach. Instead of learning Salesforce-specific patterns, developers learn web platform features that transfer to any JavaScript environment. This has profound implications for talent acquisition, knowledge retention, and long-term maintainability.`
  },
  'shield-platform-encryption': {
    id: 3,
    title: "Shield Platform Encryption Decoded",
    category: "Security",
    readTime: "4 MIN READ",
    author: "Editorial Team",
    date: "OCT 12, 2023",
    excerpt: "Protecting PII without sacrificing searchability. A technical deep dive into deterministic encryption patterns.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmQHaNdM2n98GvtgV_PfXhz8gXMeJg3K3KoEMpFkGem4r9MdZQRMtUgSUvwDco50hasyAY9H3WCOSwcBLAVHIUMzpQrkHNKUqBGWa8t6fkLPkOGSSQb5GSoltPO6pV8rh7-80DcD07njrOzFFZ_Ke74nvN0RegiW49cixE_r0dAtJikDnu0gYdnAMXMLi4E77oDfIpmlZJlFe36MjJfn7tbFek7XY1UVjVzzU5pY0kcuRn8NunRPzh_7f9ulZRptSVvCa-VSC5LMQ",
    content: `Salesforce Shield Platform Encryption provides an additional layer of protection for sensitive data at rest. But implementing it correctly requires understanding the trade-offs between security, functionality, and performance.

## Deterministic vs. Probabilistic Encryption

Shield offers two encryption schemes:

**Deterministic Encryption**: Same plaintext always produces the same ciphertext. This enables equality-based SOQL queries (WHERE clauses) but is vulnerable to frequency analysis attacks.

**Probabilistic Encryption**: Each encryption produces different ciphertext. More secure but limits query capabilities to filterable fields only.

## The Searchability Trade-off

Most organizations need to query encrypted fields. This creates a tension:
- Deterministic encryption allows WHERE clauses but reveals patterns
- Probabilistic encryption hides patterns but limits queries

Our recommended approach uses a hybrid strategy:
1. Use deterministic encryption for fields that must appear in WHERE clauses
2. Use probabilistic encryption for high-sensitivity fields (SSN, bank accounts)
3. Implement application-layer search using tokenized indexes for cross-field queries

## Key Management Best Practices

- Rotate tenant secrets quarterly, not annually
- Maintain separate key rings for different data classifications
- Use Shield Event Monitoring to track encryption key usage
- Implement break-glass procedures with multi-party approval

## Performance Impact

In our testing, Shield encryption adds 15-30ms overhead per encrypted field per query. For orgs with heavy reporting workloads, consider materialized views or analytics snapshots to avoid real-time decryption on every report run.`
  },
  'salesforce-dx-beyond-basics': {
    id: 4,
    title: "Salesforce DX: Beyond the Basics",
    category: "DevOps",
    readTime: "8 MIN READ",
    author: "Editorial Team",
    date: "SEP 28, 2023",
    excerpt: "Transitioning to package-based development. Why your source-of-truth needs to live outside of your sandbox.",
    content: `Salesforce DX introduced a paradigm shift in how we think about Salesforce development. Moving from org-centric to source-centric development requires rethinking everything from branching strategies to deployment pipelines.

## Package-Based Development

Unlocked and managed packages provide modularity that monolithic metadata deployments cannot match:

**Benefits:**
- Versioned dependencies with semantic versioning
- Independent deployment cycles for different functional areas
- Reduced blast radius for breaking changes
- Clear ownership boundaries in large organizations

## Branching Strategy

We recommend a trunk-based development model with short-lived feature branches:
- Main branch always represents production state
- Feature branches live < 3 days
- Release branches created from main for hotfix isolation
- Automated merge gates enforce quality standards

## CI/CD Pipeline Architecture

A robust Salesforce DX pipeline includes:
1. **Scratch org creation** with definition files
2. **Package installation** in dependency order
3. **Source deployment** from feature branch
4. **Automated testing** with Apex and LWC test suites
5. **Static analysis** with PMD and ESLint
6. **Security scanning** with custom rulesets
7. **Performance testing** with synthetic transactions

## Common Pitfalls

- Over-reliance on scratch org definitions that drift from production
- Ignoring metadata API-only features that cannot be packaged
- Treating unlocked packages as deployment artifacts rather than versioned units
- Skipping integration testing between packages`
  },
  'event-driven-architectures': {
    id: 5,
    title: "Event-Driven Architectures with Platform Events",
    category: "Integration",
    readTime: "6 MIN READ",
    author: "Editorial Team",
    date: "SEP 15, 2023",
    excerpt: "Reducing coupled dependencies using pub/sub patterns within the Salesforce ecosystem.",
    content: `Platform Events enable asynchronous, loosely-coupled communication within and beyond the Salesforce ecosystem. Understanding when and how to use them is critical for building scalable enterprise architectures.

## When to Use Platform Events

**Good candidates:**
- Cross-org data synchronization
- Integration with external systems (Kafka, MuleSoft)
- Decoupling trigger logic from business processes
- Real-time notification systems

**Poor candidates:**
- Synchronous user-facing operations requiring immediate feedback
- Simple CRUD operations within a single transaction
- Scenarios requiring guaranteed delivery ordering

## Publishing Patterns

**Apex Publishing:**
Use EventBus.publish() for programmatic event creation. Batch your publishes to stay within governor limits—2000 events per transaction.

**Process Builder/Flow:**
Good for declarative event publishing but adds latency. Use for non-time-critical scenarios.

**Change Data Capture:**
Automatic event publishing for record changes. Best for data synchronization patterns where you need before/after values.

## Subscription Patterns

**Apex Triggers:**
Subscribe with after insert triggers on the Platform Event object. Process events in batches for efficiency.

**CometD / Streaming API:**
Real-time browser subscriptions for UI notifications. Remember the 20-second long-polling interval.

**External Consumers:**
Use the Pub/Sub API for external system integration. Supports both subscribe and publish operations.

## Error Handling

Failed event processing requires a replay strategy. Use the Replay ID to resume from the last successfully processed event. Implement dead letter queues for events that fail after retry attempts.`
  },
  'multi-org-dilemma': {
    id: 6,
    title: "The Multi-Org Dilemma: Consolidation vs. Coexistence",
    category: "Architecture",
    readTime: "10 MIN READ",
    author: "Editorial Team",
    date: "AUG 30, 2023",
    excerpt: "When to merge and when to manage. A strategic framework for global enterprise deployments.",
    content: `Every global enterprise eventually faces the multi-org question: do you consolidate into a single Salesforce org, or do you maintain separate orgs for different business units? The answer is rarely straightforward.

## Consolidation Advantages

- Single source of truth for customer data
- Unified reporting and analytics
- Reduced total cost of ownership
- Simplified integration landscape
- Consistent user experience

## Coexistence Advantages

- Isolation of business unit customizations
- Independent release cycles
- Regulatory compliance for data residency
- Reduced risk of cross-business-unit conflicts
- Easier divestiture/acquisition integration

## Decision Framework

**Consolidate when:**
- Business units share >30% of customer records
- Cross-sell and upsell are strategic priorities
- Data residency requirements can be met in a single region
- IT organization has capacity for a multi-year migration

**Coexist when:**
- Business units have fundamentally different processes
- Regulatory requirements mandate data separation
- M&A activity is frequent
- Org customizations are deeply entrenched

## Hybrid Approaches

Many organizations benefit from a hybrid model:
- **Shared org for CRM + separate orgs for industry clouds**
- **Hub-and-spoke with a master data org**
- **Federated identity with org-specific customizations**

The key is to make the decision based on business requirements, not technical convenience. Document the trade-offs, establish clear governance, and plan for the architecture to evolve over time.`
  }
};

const slugMap = {
  1: 'aura-component-performance',
  2: 'salesforce-lightning-web-components',
  3: 'shield-platform-encryption',
  4: 'salesforce-dx-beyond-basics',
  5: 'event-driven-architectures',
  6: 'multi-org-dilemma'
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts[id] || posts[slugMap[id]];

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-6xl font-bold font-headline tracking-tighter mb-6">Article Not Found</h1>
        <p className="text-on-surface-variant mb-10 text-lg">The requested article does not exist.</p>
        <Link to="/blog" className="cyber-gradient text-[#062100] px-10 py-4 rounded-md font-label font-black uppercase text-sm tracking-widest">
          Back to Blog
        </Link>
      </div>
    );
  }

  const paragraphs = post.content.split('\n\n');

  return (
    <>
      <Helmet>
        <title>{post.title} | Blog | Anuhya Digital</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="px-8 py-24 md:py-40 max-w-screen-2xl mx-auto">
        <div className="max-w-4xl mx-auto space-y-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-on-surface-variant hover:text-primary transition-all font-mono text-xs uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>

          <header className="space-y-8">
            <span className="font-mono text-xs font-black tracking-widest text-primary uppercase">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter leading-[0.9]">
              {post.title}
            </h1>
            <p className="text-on-surface-variant text-xl font-light leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full surface-highest border border-outline-variant/30 flex items-center justify-center text-primary">
                  <User size={18} />
                </div>
                <div>
                  <span className="text-sm font-bold font-headline block">{post.author}</span>
                  {post.role && <span className="text-xs text-on-surface-variant font-mono uppercase tracking-widest">{post.role}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-on-surface-variant/60 uppercase tracking-widest">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {post.img && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden aspect-video"
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8 font-body text-lg text-on-surface-variant leading-relaxed"
          >
            {paragraphs.map((para, i) => {
              if (para.startsWith('## ')) {
                return (
                  <h2 key={i} className="text-2xl font-bold font-headline text-on-surface tracking-tight pt-6">
                    {para.replace('## ', '')}
                  </h2>
                );
              }
              if (para.startsWith('**') && para.includes(':**')) {
                const [title, ...rest] = para.split(':**');
                return (
                  <div key={i} className="space-y-2">
                    <p className="font-bold text-on-surface">
                      {title.replace(/\*\*/g, '')}:
                      <span className="font-normal text-on-surface-variant">{rest.join(':')}</span>
                    </p>
                  </div>
                );
              }
              if (para.startsWith('- ')) {
                return (
                  <ul key={i} className="space-y-3 pl-6">
                    {para.split('\n').map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                        <span>{item.replace(/^- \*\*(.+?)\*\*:?\s*/, '').replace(/\*\*(.+?)\*\*/g, '$1')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (/^\d+\./.test(para)) {
                return (
                  <ol key={i} className="space-y-3 pl-6 list-decimal">
                    {para.split('\n').map((item, j) => (
                      <li key={j}>{item.replace(/^\d+\.\s*/, '').replace(/\*\*(.+?)\*\*/g, '$1')}</li>
                    ))}
                  </ol>
                );
              }
              return (
                <p key={i}>{para.replace(/\*\*(.+?)\*\*/g, '$1')}</p>
              );
            })}
          </motion.div>

          <div className="pt-10 flex flex-col sm:flex-row gap-6">
            <Link
              to="/contact"
              className="cyber-gradient text-[#062100] px-12 py-5 rounded-md font-label font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(173,255,133,0.2)]"
            >
              Discuss This Topic
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/blog"
              className="border border-outline-variant/30 text-on-surface-variant px-12 py-5 rounded-md font-label font-black uppercase text-sm tracking-widest flex items-center justify-center gap-3 hover:border-primary hover:text-primary transition-all active:scale-95"
            >
              All Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
