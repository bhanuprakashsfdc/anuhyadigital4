const blogPosts2 = [
  {
    id: 11,
    slug: "salesforce-data-cloud-unifying-customer-data",
    category: "Salesforce",
    title: "Salesforce Data Cloud: Unifying Customer Data for Personalization",
    keyword: "Salesforce Data Cloud",
    date: "2026-03-10",
    readTime: "14 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/salesforce-data-cloud-unifying-customer-data.png",
    excerpt: "Learn how Salesforce Data Cloud unifies customer data from multiple sources to power real-time personalization, segmentation, and activation across channels.",
    content: `<h2>Introduction</h2>
<p>Salesforce Data Cloud (formerly Salesforce CDP) represents a fundamental shift in how organizations manage and activate customer data. By ingesting data from every touchpoint — CRM records, web analytics, mobile apps, email engagement, purchase history, and third-party sources — Data Cloud creates a unified customer profile that enables true 1:1 personalization at scale. This is not just another data warehouse; it is a real-time identity resolution and activation engine built into the Salesforce platform.</p>
<p>In this guide, we explore how to set up Data Cloud, ingest data from multiple sources, configure identity resolution rules, build calculated insights, and activate segments across Salesforce marketing channels. Each section includes practical configurations and code examples for common scenarios.</p>

<h2>Best Practices for Salesforce Data Cloud</h2>
<ul>
<li><strong>Start with a clear data model.</strong> Map your customer data sources to Data Cloud's data model objects (DMOs) before ingestion. Understanding how standard and custom DMOs relate ensures your identity resolution works correctly.</li>
<li><strong>Use data streams for continuous ingestion.</strong> Configure data streams from Salesforce CRM, Marketing Cloud, and external sources to keep Data Cloud profiles current. Batch ingestion works for historical loads; streaming is for real-time updates.</li>
<li><strong>Configure identity resolution rules carefully.</strong> Define match rules based on email, phone, and custom identifiers. Order your rules from most to least confident. Test with representative data before activating.</li>
<li><strong>Build calculated insights for engagement scoring.</strong> Use Data Cloud's calculated insight builder to compute metrics like lifetime value, engagement score, and churn risk directly within the platform.</li>
<li><strong>Segment using semantic definitions.</strong> Create segments using natural language or the visual segment builder. Test segment membership counts before activating to marketing channels.</li>
<li><strong>Activate to multiple channels.</strong> Connect segments to Marketing Cloud, Advertising, and Sales Cloud. Real-time activation enables personalization at every customer touchpoint.</li>
</ul>

<h2>Code Example: Data Cloud Query API</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;// Query unified profiles using Data Cloud's Query API
async function queryDataCloudProfiles(segmentName) {
    const response = await fetch(
        'https://your-instance.salesforce.com/api/v1/query',
        {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sql: \`
                    SELECT
                        Id__c,
                        FirstName__c,
                        LastName__c,
                        Email__c,
                        Engagement_Score__c,
                        Lifetime_Value__c
                    FROM Unified_Individual__dlm
                    WHERE Id__c IN (
                        SELECT IndividualId__c
                        FROM Segment_Membership__dlm
                        WHERE SegmentName__c = '\${segmentName}'
                    )
                    ORDER BY Engagement_Score__c DESC
                    LIMIT 100
                \`
            })
        }
    );
    return response.json();
}

// Usage
const highValueCustomers = await queryDataCloudProfiles('High_Value_At_Risk');
console.log(\`Found \${highValueCustomers.data.length} profiles\`);&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll for Data Cloud Segment Explorer</h2>

<h3>Step 1: Create the Apex Data Cloud Connector</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;public with sharing class DataCloudExplorer {
    @AuraEnabled
    public static Map&lt;String, Object&gt; querySegmentMembers(
        String segmentName, Integer offset, Integer pageSize
    ) {
        // Use Data Cloud Connect API
        ConnectApi.CalculatedInsightsResult result =
            ConnectApi.CalculatedInsights.queryCalculatedInsights(
                'SELECT * FROM ' + segmentName +
                ' LIMIT ' + pageSize + ' OFFSET ' + offset
            );
        List&lt;Map&lt;String, Object&gt;&gt; members = new List&lt;Map&lt;String, Object&gt;&gt;();
        for (ConnectApi.CalculatedInsightsRow row : result.data) {
            members.add(new Map&lt;String, Object&gt;{
                'id' =&gt; row.dimensions.get('Id__c'),
                'name' =&gt; row.dimensions.get('FullName__c'),
                'email' =&gt; row.dimensions.get('Email__c'),
                'score' =&gt; row.measures.get('Engagement_Score__c')
            });
        }
        return new Map&lt;String, Object&gt;{
            'members' =&gt; members,
            'hasMore' =&gt; members.size() == pageSize,
            'nextOffset' =&gt; offset + members.size()
        };
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the LWC Segment Viewer</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;import { LightningElement } from 'lwc';
import querySegmentMembers from '@salesforce/apex/DataCloudExplorer.querySegmentMembers';

export default class SegmentExplorer extends LightningElement {
    members = [];
    offset = 0;
    pageSize = 50;
    hasMore = true;
    isLoading = false;
    segmentName = 'High_Value_At_Risk';

    connectedCallback() { this.loadMembers(); }

    handleScroll(e) {
        const el = e.target;
        if (el.scrollHeight - el.scrollTop - el.clientHeight &lt; 100
            &amp;&amp; !this.isLoading &amp;&amp; this.hasMore) {
            this.loadMembers();
        }
    }

    async loadMembers() {
        this.isLoading = true;
        try {
            const result = await querySegmentMembers({
                segmentName: this.segmentName,
                offset: this.offset,
                pageSize: this.pageSize
            });
            this.members = [...this.members, ...result.members];
            this.hasMore = result.hasMore;
            this.offset = result.nextOffset;
        } catch (err) { console.error(err); }
        this.isLoading = false;
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Template with Score Visualization</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;&lt;template&gt;
    &lt;div class="scroll-area" style="height:600px;overflow-y:auto;" onscroll={handleScroll}&gt;
        &lt;template for:each={members} for:item="m"&gt;
            &lt;div key={m.id} class="member-row"&gt;
                &lt;div class="member-info"&gt;
                    &lt;h4&gt;{m.name}&lt;/h4&gt;
                    &lt;p&gt;{m.email}&lt;/p&gt;
                &lt;/div&gt;
                &lt;div class="score-bar"&gt;
                    &lt;div class="score-fill" style={scoreStyle}&gt;&lt;/div&gt;
                    &lt;span&gt;{m.score}&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/template&gt;
        &lt;template if:true={isLoading}&gt;
            &lt;lightning-spinner&gt;&lt;/lightning-spinner&gt;
        &lt;/template&gt;
    &lt;/div&gt;
&lt;/template&gt;&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Salesforce Data Cloud transforms fragmented customer data into actionable unified profiles. By following the ingestion, identity resolution, and activation patterns outlined here, organizations can deliver truly personalized experiences across every channel. The infinite scroll segment explorer provides a practical interface for exploring and validating segment membership at scale.</p>`
  },
  {
    id: 12,
    slug: "salesforce-flow-automation-no-code-mastery",
    category: "Salesforce",
    title: "Salesforce Flow Automation: No-Code Workflow Mastery",
    keyword: "Salesforce Flow automation",
    date: "2026-03-07",
    readTime: "13 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/salesforce-flow-automation-no-code-mastery.png",
    excerpt: "Master Salesforce Flow automation with advanced patterns for record-triggered flows, screen flows, and orchestrated processes that replace custom code.",
    content: `<h2>Introduction</h2>
<p>Salesforce Flow automation has evolved into a powerful platform capable of handling complex business processes that previously required Apex code. With record-triggered flows, screen flows, orchestrations, and platform event-triggered flows, admins and developers can build sophisticated automations using a visual builder while maintaining performance and governor limit efficiency.</p>
<p>This guide covers advanced Flow patterns, performance optimization, error handling, and architectural decisions for when to use Flow versus code. Each section includes specific configurations and formulas you can apply immediately.</p>

<h2>Best Practices for Salesforce Flow</h2>
<ul>
<li><strong>Use before-save flows for simple field updates.</strong> Before-save record-triggered flows are 10x faster than after-save flows because they do not trigger additional save operations. Use them for field defaults, validations, and simple transformations.</li>
<li><strong>Consolidate flows per object.</strong> Having 10 flows on the Account object causes order-of-execution complexity. Consolidate related automations into fewer, well-organized flows using decision elements and subflows.</li>
<li><strong>Use Custom Metadata for configurable logic.</strong> Store thresholds, assignment rules, and conditional values in Custom Metadata Types. Reference them in Flow using Get Records elements to make automations configurable without editing flows.</li>
<li><strong>Implement fault paths on every action.</strong> Every Create, Update, Delete, and Callout element should have a fault path that logs the error and notifies administrators.</li>
<li><strong>Use subflows for reusable logic.</strong> Extract common patterns like address validation, notification sending, and approval routing into subflows that can be called from multiple parent flows.</li>
<li><strong>Avoid SOQL in loops.</strong> Just like Apex, Flow SOQL queries inside loops hit governor limits. Use Collection filters and transforms instead of querying inside loops.</li>
</ul>

<h2>Code Example: Flow Error Handler Subflow</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;Flow Structure: ErrorHandler Subflow
============================================
Input Variables:
  - recordId (Text)
  - flowName (Text)
  - errorMessage (Text)
  - errorStackTrace (Text)

Elements:
1. Create Record: Flow_Error_Log__c
   Fields:
     Record_Id__c = {!recordId}
     Flow_Name__c = {!flowName}
     Error_Message__c = {!errorMessage}
     Stack_Trace__c = {!errorStackTrace}
     Timestamp__c = {!$Flow.CurrentDateTime}

2. Get Records: Custom Notification Type
   WHERE DeveloperName = 'Flow_Error_Alert'

3. Send Custom Notification
   Recipient: {!adminUserId}
   Title: 'Flow Error: ' + {!flowName}
   Body: {!errorMessage}

4. Fault Path on each element
   → Log to system, never silently fail&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll for Flow Debug Logs Viewer</h2>

<h3>Step 1: Create the Apex Flow Log Retriever</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;public with sharing class FlowLogViewer {
    @AuraEnabled
    public static Map&lt;String, Object&gt; getFlowLogs(
        String flowName, DateTime lastTimestamp, Integer pageSize
    ) {
        String query = 'SELECT Id, Flow_Name__c, Error_Message__c, ' +
                       'Record_Id__c, Timestamp__c FROM Flow_Error_Log__c';
        if (String.isNotBlank(flowName)) {
            query += ' WHERE Flow_Name__c = :flowName';
            if (lastTimestamp != null) {
                query += ' AND Timestamp__c &lt; :lastTimestamp';
            }
        } else if (lastTimestamp != null) {
            query += ' WHERE Timestamp__c &lt; :lastTimestamp';
        }
        query += ' ORDER BY Timestamp__c DESC LIMIT :pageSize';
        List&lt;Flow_Error_Log__c&gt; logs = Database.query(query);
        return new Map&lt;String, Object&gt;{
            'logs' =&gt; logs,
            'hasMore' =&gt; logs.size() == pageSize,
            'lastTimestamp' =&gt; logs.isEmpty() ? null : logs[logs.size()-1].Timestamp__c
        };
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Log Viewer LWC</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;import { LightningElement } from 'lwc';
import getFlowLogs from '@salesforce/apex/FlowLogViewer.getFlowLogs';

export default class FlowLogViewer extends LightningElement {
    logs = [];
    lastTimestamp = null;
    hasMore = true;
    isLoading = false;
    filterFlow = '';

    connectedCallback() { this.loadLogs(); }

    handleScroll(e) {
        const el = e.target;
        if (el.scrollHeight - el.scrollTop - el.clientHeight &lt; 80
            &amp;&amp; !this.isLoading &amp;&amp; this.hasMore) {
            this.loadLogs();
        }
    }

    async loadLogs() {
        this.isLoading = true;
        try {
            const result = await getFlowLogs({
                flowName: this.filterFlow || null,
                lastTimestamp: this.lastTimestamp,
                pageSize: 30
            });
            this.logs = [...this.logs, ...result.logs];
            this.hasMore = result.hasMore;
            this.lastTimestamp = result.lastTimestamp;
        } catch (err) { console.error(err); }
        this.isLoading = false;
    }

    handleFilter(e) {
        this.filterFlow = e.target.value;
        this.logs = [];
        this.lastTimestamp = null;
        this.hasMore = true;
        this.loadLogs();
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Template</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;&lt;template&gt;
    &lt;lightning-input label="Filter by Flow Name" onchange={handleFilter}&gt;&lt;/lightning-input&gt;
    &lt;div class="log-container" style="height:500px;overflow-y:auto;" onscroll={handleScroll}&gt;
        &lt;template for:each={logs} for:item="log"&gt;
            &lt;div key={log.Id} class="log-entry slds-box slds-m-bottom_x-small"&gt;
                &lt;p class="slds-text-title_caps"&gt;{log.Flow_Name__c}&lt;/p&gt;
                &lt;p class="slds-text-color_error"&gt;{log.Error_Message__c}&lt;/p&gt;
                &lt;p&gt;Record: {log.Record_Id__c}&lt;/p&gt;
            &lt;/div&gt;
        &lt;/template&gt;
        &lt;template if:true={isLoading}&gt;
            &lt;lightning-spinner&gt;&lt;/lightning-spinner&gt;
        &lt;/template&gt;
    &lt;/div&gt;
&lt;/template&gt;&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Salesforce Flow automation enables complex business processes without code when applied with proper architectural patterns. The key is knowing when Flow is the right tool and when Apex is necessary. The patterns here — error handling subflows, consolidated per-object flows, and cursor-based log viewing — represent production-tested approaches that scale with your organization.</p>`
  },
  {
    id: 13,
    slug: "nextjs-15-app-router-production-applications",
    category: "Web Development",
    title: "Next.js 15 App Router: Building Production-Ready Applications",
    keyword: "Next.js 15 App Router",
    date: "2026-03-04",
    readTime: "16 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/nextjs-15-app-router-production-applications.png",
    excerpt: "Build production-ready applications with Next.js 15 App Router. Master Server Components, route handlers, middleware, caching strategies, and deployment patterns.",
    content: `<h2>Introduction</h2>
<p>Next.js 15 App Router represents the culmination of years of evolution in React-based web frameworks. By embracing React Server Components, streaming rendering, and a file-system-based router with layouts, loading states, and error boundaries, Next.js 15 provides a complete framework for building production web applications. Understanding its conventions and performance characteristics is essential for modern full-stack development.</p>
<p>This guide covers the practical patterns you need for production applications: data fetching strategies, caching and revalidation, route handlers for APIs, middleware for authentication, and deployment optimization. Each pattern includes real code from production applications.</p>

<h2>Best Practices for Next.js 15 App Router</h2>
<ul>
<li><strong>Default to Server Components.</strong> Only add 'use client' when you need interactivity (event handlers, state, effects). Server Components reduce client bundle size and enable direct database access.</li>
<li><strong>Use fetch caching wisely.</strong> Next.js 15 fetches are no longer cached by default. Use { cache: 'force-cache' } for static data and { next: { revalidate: N } } for time-based revalidation.</li>
<li><strong>Implement streaming with Suspense.</strong> Wrap slow data fetches in Suspense boundaries. Users see the page layout immediately while data loads progressively.</li>
<li><strong>Use Route Handlers for APIs.</strong> app/api/route.js replaces the pages/api pattern. Each HTTP method is a named export (GET, POST, PUT, DELETE).</li>
<li><strong>Implement middleware for cross-cutting concerns.</strong> Authentication, redirects, feature flags, and request logging belong in middleware.js at the project root.</li>
<li><strong>Parallel route loading.</strong> Use loading.tsx in each route segment to show instant feedback while the page loads. Combine with error.tsx for robust error handling.</li>
</ul>

<h2>Code Example: Cursor-Based API Route</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100);
    const category = searchParams.get('category');

    const where = category ? { category } : {};
    const products = await db.product.findMany({
        where,
        take: limit + 1,
        ...(cursor &amp;&amp; { cursor: { id: cursor }, skip: 1 }),
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, price: true, image: true, category: true }
    });

    const hasMore = products.length &gt; limit;
    if (hasMore) products.pop();

    return NextResponse.json({
        products,
        hasMore,
        nextCursor: products.length ? products[products.length - 1].id : null
    });
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll Feed with Next.js 15</h2>

<h3>Step 1: Create the Server Page</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;// app/feed/page.tsx
import { Suspense } from 'react';
import { FeedList } from './FeedList';
import { FeedSkeleton } from './FeedSkeleton';

async function getInitialFeed() {
    const res = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + '/api/products?limit=20',
        { cache: 'no-store' }
    );
    return res.json();
}

export default async function FeedPage() {
    const initial = await getInitialFeed();
    return (
        &lt;main className="feed-page"&gt;
            &lt;h1&gt;Product Feed&lt;/h1&gt;
            &lt;Suspense fallback={&lt;FeedSkeleton /&gt;}&gt;
                &lt;FeedList
                    initialProducts={initial.products}
                    initialCursor={initial.nextCursor}
                    initialHasMore={initial.hasMore}
                /&gt;
            &lt;/Suspense&gt;
        &lt;/main&gt;
    );
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Client Infinite Scroll</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;'use client';
import { useState, useRef, useCallback } from 'react';

interface Product { id: string; name: string; price: number; image: string; }

export function FeedList({ initialProducts, initialCursor, initialHasMore }) {
    const [products, setProducts] = useState&lt;Product[]&gt;(initialProducts);
    const [cursor, setCursor] = useState(initialCursor);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [loading, setLoading] = useState(false);
    const observer = useRef&lt;IntersectionObserver&gt;();

    const lastRef = useCallback((node: HTMLDivElement | null) =&gt; {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries =&gt; {
            if (entries[0].isIntersecting &amp;&amp; hasMore) loadMore();
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    async function loadMore() {
        setLoading(true);
        const res = await fetch('/api/products?cursor=' + cursor + '&amp;limit=20');
        const data = await res.json();
        setProducts(prev =&gt; [...prev, ...data.products]);
        setCursor(data.nextCursor);
        setHasMore(data.hasMore);
        setLoading(false);
    }

    return (
        &lt;div className="product-grid"&gt;
            {products.map((p, i) =&gt; (
                &lt;div key={p.id} ref={i === products.length - 1 ? lastRef : null} className="product-card"&gt;
                    &lt;img src={p.image} alt={p.name} loading="lazy" /&gt;
                    &lt;h3&gt;{p.name}&lt;/h3&gt;
                    &lt;span&gt;&#36;{p.price}&lt;/span&gt;
                &lt;/div&gt;
            ))}
            {loading &amp;&amp; &lt;p className="loading"&gt;Loading more products...&lt;/p&gt;}
        &lt;/div&gt;
    );
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Add Loading Skeleton</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;// app/feed/FeedSkeleton.tsx
export function FeedSkeleton() {
    return (
        &lt;div className="product-grid"&gt;
            {Array.from({ length: 8 }).map((_, i) =&gt; (
                &lt;div key={i} className="product-card skeleton"&gt;
                    &lt;div className="skeleton-image" /&gt;
                    &lt;div className="skeleton-text w-3/4" /&gt;
                    &lt;div className="skeleton-text w-1/4" /&gt;
                &lt;/div&gt;
            ))}
        &lt;/div&gt;
    );
}

/* CSS */
.skeleton-image { aspect-ratio: 1; background: #222b2e; border-radius: 0.5rem; animation: pulse 1.5s infinite; }
.skeleton-text { height: 1rem; background: #222b2e; border-radius: 0.25rem; margin: 0.5rem 0; animation: pulse 1.5s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Next.js 15 App Router provides a complete framework for production applications when used with its conventions rather than against them. The server-first approach reduces client complexity, streaming improves perceived performance, and the route handler pattern keeps API code colocated with the pages that consume it. The infinite scroll feed pattern demonstrated here combines server-side initial load with client-side pagination for optimal user experience.</p>`
  },
  {
    id: 14,
    slug: "tailwind-css-v4-advanced-utility-patterns",
    category: "Web Development",
    title: "Tailwind CSS v4: Advanced Utility-First Patterns",
    keyword: "Tailwind CSS v4 patterns",
    date: "2026-02-28",
    readTime: "13 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/tailwind-css-v4-advanced-utility-patterns.png",
    excerpt: "Master Tailwind CSS v4 with advanced patterns including the new CSS-first configuration, container queries, cascade layers, and dynamic utility generation.",
    content: `<h2>Introduction</h2>
<p>Tailwind CSS v4 is a ground-up rewrite that moves configuration from JavaScript to CSS, introduces first-class container query support, and leverages modern CSS features like cascade layers and @property. The result is faster builds, smaller output, and a more intuitive developer experience. Understanding these new patterns unlocks the full potential of utility-first CSS in modern applications.</p>
<p>This guide covers the most impactful v4 features and patterns, from the new CSS-based configuration system to advanced responsive and theming patterns. Each example demonstrates production-quality techniques you can apply immediately.</p>

<h2>Best Practices for Tailwind CSS v4</h2>
<ul>
<li><strong>Use CSS-based configuration.</strong> Define your theme in @theme blocks within your CSS file. This replaces tailwind.config.js and enables CSS-native features like custom properties and @property declarations.</li>
<li><strong>Leverage @theme for design tokens.</strong> Colors, spacing, fonts, and animations are defined in @theme and become available as utility classes and CSS custom properties simultaneously.</li>
<li><strong>Use @utility for custom utilities.</strong> Define custom utilities with @utility instead of plugin APIs. These integrate with Tailwind's cascade layer system for proper specificity.</li>
<li><strong>Container queries are built in.</strong> Use @container and @min-*/@max-* variants for component-level responsive design without external plugins.</li>
<li><strong>Use @property for animated custom properties.</strong> Register custom properties with @property to enable smooth transitions on values that CSS cannot normally interpolate.</li>
<li><strong>Leverage cascade layers.</strong> Tailwind v4 uses @layer to manage specificity. Your custom CSS in @layer utilities overrides base styles predictably.</li>
</ul>

<h2>Code Example: v4 Theme Configuration</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;/* index.css - Tailwind v4 CSS-first configuration */
@import "tailwindcss";

@theme {
    --color-primary: #adff85;
    --color-primary-dark: #2a7302;
    --color-background: #0c1517;
    --color-surface: #2d3638;
    --color-on-surface: #dae4e7;
    --color-on-surface-variant: #c0cab6;

    --font-headline: "Space Grotesk", sans-serif;
    --font-body: "Manrope", sans-serif;
    --font-label: "Be Vietnam Pro", sans-serif;

    --animate-fade-in: fade-in 0.3s ease-out;
    --animate-slide-up: slide-up 0.4s ease-out;
}

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Custom utilities */
@utility glass-card {
    background: var(--color-surface) / 80%;
    backdrop-filter: blur(24px);
    border: 1px solid rgba(65, 73, 58, 0.2);
    border-radius: 1rem;
}

@utility neon-text {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll Grid with Tailwind v4</h2>

<h3>Step 1: Define the Container Query Card</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;.card-wrapper {
    container-type: inline-size;
    container-name: card;
}

.card {
    @apply glass-card p-4 transition-all duration-300;
}

@container card (min-width: 400px) {
    .card {
        @apply grid grid-cols-[200px_1fr] gap-4 p-6;
    }
}

@container card (min-width: 600px) {
    .card {
        @apply grid-cols-[300px_1fr] gap-6 p-8;
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Scroll Container</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;function InfiniteGrid() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef(null);

    const loadMore = useCallback(async () =&gt; {
        if (loading || !hasMore) return;
        setLoading(true);
        const res = await fetch('/api/items?page=' + page + '&amp;limit=12');
        const data = await res.json();
        setItems(prev =&gt; [...prev, ...data.items]);
        setHasMore(data.hasMore);
        setPage(p =&gt; p + 1);
        setLoading(false);
    }, [page, loading, hasMore]);

    useEffect(() =&gt; { loadMore(); }, []);

    const handleScroll = useCallback((e) =&gt; {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop - clientHeight &lt; 200) loadMore();
    }, [loadMore]);

    return (
        &lt;div ref={containerRef} onScroll={handleScroll}
             className="h-screen overflow-y-auto p-6 bg-background"&gt;
            &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"&gt;
                {items.map(item =&gt; (
                    &lt;div key={item.id} className="card-wrapper"&gt;
                        &lt;div className="card"&gt;
                            &lt;img src={item.image} alt={item.title} className="rounded-lg w-full aspect-video object-cover" /&gt;
                            &lt;div&gt;
                                &lt;h3 className="text-lg font-bold text-on-surface font-[--font-headline]"&gt;{item.title}&lt;/h3&gt;
                                &lt;p className="text-sm text-on-surface-variant mt-2"&gt;{item.summary}&lt;/p&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                ))}
            &lt;/div&gt;
            {loading &amp;&amp; &lt;p className="text-center text-on-surface-variant py-8 animate-pulse"&gt;Loading...&lt;/p&gt;}
        &lt;/div&gt;
    );
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Tailwind CSS v4 represents a significant evolution that makes utility-first CSS more powerful and more intuitive. The CSS-first configuration, built-in container queries, and @utility definitions eliminate the friction of earlier versions. The infinite scroll grid pattern shown here leverages v4's container queries to create cards that adapt to their grid position automatically.</p>`
  },
  {
    id: 15,
    slug: "nodejs-microservices-architecture-guide",
    category: "Web Development",
    title: "Node.js Microservices: Architecture and Implementation Guide",
    keyword: "Node.js microservices",
    date: "2026-02-24",
    readTime: "15 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/nodejs-microservices-architecture-guide.png",
    excerpt: "Design and implement Node.js microservices with proper service boundaries, inter-service communication, data management, and observability patterns.",
    content: `<h2>Introduction</h2>
<p>Node.js microservices architecture enables teams to build, deploy, and scale individual services independently. The combination of Node.js's event-driven, non-blocking I/O model with microservice patterns produces systems that handle high throughput while remaining maintainable. However, microservices introduce distributed system complexity that requires careful architectural decisions around service boundaries, communication patterns, and data consistency.</p>
<p>This guide covers the practical patterns for building production Node.js microservices, from service design and communication to deployment and monitoring. Each pattern includes implementation code using Express, Fastify, and related tools.</p>

<h2>Best Practices for Node.js Microservices</h2>
<ul>
<li><strong>Define clear service boundaries.</strong> Each service should own a single business capability with its own data store. Use domain-driven design to identify bounded contexts.</li>
<li><strong>Use async communication by default.</strong> Message queues (RabbitMQ, Kafka) for events and commands. Synchronous HTTP only when an immediate response is required.</li>
<li><strong>Implement the Saga pattern for distributed transactions.</strong> When an operation spans multiple services, use choreography or orchestration sagas to maintain consistency without distributed locks.</li>
<li><strong>Add circuit breakers for resilience.</strong> Use circuit breaker patterns on all inter-service calls to prevent cascade failures when downstream services are unhealthy.</li>
<li><strong>Centralize logging and tracing.</strong> Use structured JSON logging with correlation IDs. Implement distributed tracing with OpenTelemetry to track requests across service boundaries.</li>
<li><strong>Health checks on every service.</strong> Expose /health and /ready endpoints. Health checks verify dependencies (database, message queue) are reachable.</li>
</ul>

<h2>Code Example: Service Template with Fastify</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;import Fastify from 'fastify';
import { randomUUID } from 'crypto';

const service = Fastify({ logger: { level: 'info' } });

// Correlation ID middleware
service.addHook('onRequest', (req, reply, done) =&gt; {
    req.correlationId = req.headers['x-correlation-id'] || randomUUID();
    reply.header('x-correlation-id', req.correlationId);
    done();
});

// Circuit breaker for external calls
class CircuitBreaker {
    constructor(threshold = 5, timeout = 30000) {
        this.failures = 0;
        this.threshold = threshold;
        this.timeout = timeout;
        this.state = 'CLOSED';
        this.nextAttempt = 0;
    }

    async call(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() &lt; this.nextAttempt) throw new Error('Circuit open');
            this.state = 'HALF_OPEN';
        }
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (err) {
            this.onFailure();
            throw err;
        }
    }

    onSuccess() { this.failures = 0; this.state = 'CLOSED'; }
    onFailure() {
        this.failures++;
        if (this.failures &gt;= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }
}

export { service, CircuitBreaker };&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Paginated API with Infinite Scroll Support</h2>

<h3>Step 1: Create the Cursor-Based Endpoint</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient(process.env.MONGO_URL);
const db = client.db('myapp');

service.get('/api/events', async (req, reply) =&gt; {
    const { cursor, limit = 20, category } = req.query;
    const filter = category ? { category } : {};
    if (cursor) filter._id = { $lt: new ObjectId(cursor) };

    const events = await db.collection('events')
        .find(filter)
        .sort({ _id: -1 })
        .limit(parseInt(limit) + 1)
        .toArray();

    const hasMore = events.length &gt; parseInt(limit);
    if (hasMore) events.pop();

    return {
        events,
        hasMore,
        nextCursor: events.length ? events[events.length - 1]._id.toString() : null
    };
});

service.listen({ port: 3000, host: '0.0.0.0' });&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Client with OnScroll</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;class EventFeed {
    constructor(container, endpoint) {
        this.container = container;
        this.endpoint = endpoint;
        this.cursor = null;
        this.hasMore = true;
        this.loading = false;
        this.init();
    }

    init() {
        this.container.addEventListener('scroll', () =&gt; this.onScroll());
        this.loadEvents();
    }

    onScroll() {
        const { scrollTop, scrollHeight, clientHeight } = this.container;
        if (scrollHeight - scrollTop - clientHeight &lt; 150 &amp;&amp; !this.loading &amp;&amp; this.hasMore) {
            this.loadEvents();
        }
    }

    async loadEvents() {
        this.loading = true;
        const params = new URLSearchParams({ limit: 20 });
        if (this.cursor) params.set('cursor', this.cursor);
        const res = await fetch(this.endpoint + '?' + params);
        const data = await res.json();
        data.events.forEach(evt =&gt; {
            const el = document.createElement('div');
            el.className = 'event-card';
            el.innerHTML = \`&lt;h4&gt;\${evt.title}&lt;/h4&gt;&lt;p&gt;\${evt.description}&lt;/p&gt;\`;
            this.container.appendChild(el);
        });
        this.hasMore = data.hasMore;
        this.cursor = data.nextCursor;
        this.loading = false;
    }
}

new EventFeed(document.getElementById('events'), '/api/events');&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Node.js microservices require careful attention to service boundaries, communication patterns, and resilience patterns. The Fastify template with circuit breakers and correlation IDs provides a production-ready foundation. The cursor-based pagination endpoint enables efficient infinite scroll feeds that work consistently across the distributed system.</p>`
  },
  {
    id: 16,
    slug: "graphql-vs-rest-api-strategy-2026",
    category: "Web Development",
    title: "GraphQL vs REST: Choosing the Right API Strategy in 2026",
    keyword: "GraphQL vs REST API",
    date: "2026-02-20",
    readTime: "14 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/graphql-vs-rest-api-strategy-2026.png",
    excerpt: "Compare GraphQL and REST API approaches with practical guidance on when to use each, hybrid architectures, performance considerations, and real-world implementation patterns.",
    content: `<h2>Introduction</h2>
<p>The GraphQL vs REST debate has matured beyond "which is better" to "which is right for this use case." Both technologies have distinct strengths: REST excels at simple CRUD operations with HTTP caching, while GraphQL shines when clients need flexible data fetching across related resources. Many production systems use both — REST for simple endpoints and GraphQL for complex data requirements.</p>
<p>This guide provides practical guidance for choosing between GraphQL and REST, with code examples showing both approaches for common scenarios. We also cover hybrid architectures and performance optimization techniques for each.</p>

<h2>Best Practices for API Design</h2>
<ul>
<li><strong>Use REST for simple CRUD and file operations.</strong> REST's HTTP semantics map naturally to resource operations. GET for reads, POST for creates, PUT for updates, DELETE for removes. HTTP caching works out of the box.</li>
<li><strong>Use GraphQL for complex, relational data fetching.</strong> When clients need data from multiple related resources, GraphQL eliminates over-fetching and under-fetching by letting clients specify exactly what they need.</li>
<li><strong>Implement DataLoader for GraphQL N+1 prevention.</strong> DataLoader batches and caches database calls within a single request, preventing the N+1 query problem that plagues naive GraphQL resolvers.</li>
<li><strong>Use persisted queries in production GraphQL.</strong> Hash queries at build time and send only the hash at runtime. This enables server-side caching and prevents arbitrary query execution.</li>
<li><strong>REST versioning with URL paths.</strong> /api/v1/users, /api/v2/users. Simple, explicit, cacheable by URL.</li>
<li><strong>GraphQL schema evolution with deprecation.</strong> Mark fields as @deprecated rather than removing them. Clients migrate at their own pace.</li>
</ul>

<h2>Code Example: GraphQL with DataLoader</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;import { ApolloServer } from '@apollo/server';
import DataLoader from 'dataloader';

// Batch function: loads multiple users by IDs in one query
const batchUsers = async (ids) =&gt; {
    const users = await db.users.findMany({ where: { id: { in: ids } } });
    const userMap = new Map(users.map(u =&gt; [u.id, u]));
    return ids.map(id =&gt; userMap.get(id) || null);
};

const server = new ApolloServer({
    typeDefs: \`
        type User { id: ID!, name: String!, email: String!, posts: [Post!]! }
        type Post { id: ID!, title: String!, author: User!, comments: [Comment!]! }
        type Comment { id: ID!, text: String!, author: User! }
        type Query { posts(limit: Int, cursor: String): PostConnection! }
        type PostConnection { edges: [PostEdge!]!, pageInfo: PageInfo! }
        type PostEdge { node: Post!, cursor: String! }
        type PageInfo { hasNextPage: Boolean!, endCursor: String }
    \`,
    resolvers: {
        Post: {
            author: (post, _, { loaders }) =&gt; loaders.userLoader.load(post.authorId),
            comments: (post) =&gt; db.comments.findMany({ where: { postId: post.id } })
        },
        Comment: {
            author: (comment, _, { loaders }) =&gt; loaders.userLoader.load(comment.authorId)
        }
    }
});

// Context creates per-request DataLoaders
const context = () =&gt; ({
    loaders: { userLoader: new DataLoader(batchUsers) }
});&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll with GraphQL Relay Pagination</h2>

<h3>Step 1: Define the Relay Connection</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;const typeDefs = \`
    type Query {
        feed(first: Int, after: String): FeedConnection!
    }
    type FeedConnection {
        edges: [FeedEdge!]!
        pageInfo: PageInfo!
    }
    type FeedEdge {
        node: Post!
        cursor: String!
    }
    type PageInfo {
        hasNextPage: Boolean!
        endCursor: String
    }
\`;

const resolvers = {
    Query: {
        feed: async (_, { first = 20, after }) =&gt; {
            const cursor = after ? decodeCursor(after) : null;
            const posts = await db.post.findMany({
                take: first + 1,
                ...(cursor &amp;&amp; { cursor: { id: cursor }, skip: 1 }),
                orderBy: { createdAt: 'desc' }
            });
            const hasNextPage = posts.length &gt; first;
            if (hasNextPage) posts.pop();
            return {
                edges: posts.map(p =&gt; ({
                    node: p,
                    cursor: encodeCursor(p.id)
                })),
                pageInfo: {
                    hasNextPage,
                    endCursor: posts.length ? encodeCursor(posts[posts.length - 1].id) : null
                }
            };
        }
    }
};&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Client-Side Infinite Scroll</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql\`
    query Feed($first: Int!, $after: String) {
        feed(first: $first, after: $after) {
            edges { node { id title excerpt createdAt } }
            pageInfo { hasNextPage endCursor }
        }
    }
\`;

function InfiniteFeed() {
    const { data, loading, fetchMore } = useQuery(FEED_QUERY, {
        variables: { first: 20 }
    });

    const handleScroll = (e) =&gt; {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop - clientHeight &lt; 200 &amp;&amp; !loading) {
            const pageInfo = data?.feed.pageInfo;
            if (pageInfo?.hasNextPage) {
                fetchMore({
                    variables: { after: pageInfo.endCursor },
                    updateQuery: (prev, { fetchMoreResult }) =&gt; ({
                        feed: {
                            edges: [...prev.feed.edges, ...fetchMoreResult.feed.edges],
                            pageInfo: fetchMoreResult.feed.pageInfo
                        }
                    })
                });
            }
        }
    };

    return (
        &lt;div onScroll={handleScroll} style={{ height: '100vh', overflowY: 'auto' }}&gt;
            {data?.feed.edges.map(({ node }) =&gt; (
                &lt;article key={node.id}&gt;
                    &lt;h2&gt;{node.title}&lt;/h2&gt;
                    &lt;p&gt;{node.excerpt}&lt;/p&gt;
                &lt;/article&gt;
            ))}
            {loading &amp;&amp; &lt;p&gt;Loading...&lt;/p&gt;}
        &lt;/div&gt;
    );
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Choose REST for simple, cacheable resource operations. Choose GraphQL for complex, relational data fetching where clients need flexibility. Many production systems use both — REST for file uploads and webhooks, GraphQL for the main application API. The Relay pagination pattern demonstrated here is the gold standard for GraphQL infinite scroll, providing efficient cursor-based pagination with proper type safety.</p>`
  },
  {
    id: 17,
    slug: "ai-driven-responsive-design-adaptive-layouts",
    category: "AI Design",
    title: "AI-Driven Responsive Design: Adaptive Layouts with Machine Learning",
    keyword: "AI responsive design",
    date: "2026-02-16",
    readTime: "14 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/ai-driven-responsive-design-adaptive-layouts.png",
    excerpt: "Implement AI-driven responsive design that adapts layouts based on user behavior, device capabilities, and content characteristics using machine learning models.",
    content: `<h2>Introduction</h2>
<p>AI-driven responsive design goes beyond fixed breakpoints by using machine learning to analyze user behavior, device capabilities, and content characteristics to dynamically adapt layouts. Instead of designing three breakpoints (mobile, tablet, desktop), AI-responsive systems continuously optimize the layout for each user's specific context. This approach produces interfaces that feel tailor-made for every visitor.</p>
<p>This guide covers practical techniques for implementing AI-driven responsive design, from data collection and model training to runtime adaptation. Each pattern works with existing CSS frameworks and does not require replacing your current layout system.</p>

<h2>Best Practices for AI Responsive Design</h2>
<ul>
<li><strong>Collect interaction data ethically.</strong> Track scroll depth, click patterns, time-on-section, and viewport size. Aggregate and anonymize data before model training. Respect privacy regulations.</li>
<li><strong>Start with rule-based adaptation.</strong> Before deploying ML models, implement rule-based adjustments (e.g., larger touch targets for users who frequently miss taps). These provide immediate value while you build ML pipelines.</li>
<li><strong>Use CSS custom properties for dynamic adaptation.</strong> AI outputs should set CSS custom properties rather than inline styles. This preserves the cascade, enables transitions, and keeps styling in CSS.</li>
<li><strong>A/B test AI adaptations.</strong> Measure the impact of layout changes on conversion, engagement, and accessibility metrics. Not all AI suggestions improve user experience.</li>
<li><strong>Maintain accessibility as a constraint.</strong> AI adaptations must never violate WCAG requirements. Minimum font sizes, contrast ratios, and focus indicators are non-negotiable.</li>
<li><strong>Cache model predictions.</strong> Run inference once per session and cache results. Re-evaluate only when significant behavior changes are detected.</li>
</ul>

<h2>Code Example: Adaptive Layout Engine</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;class AdaptiveLayoutEngine {
    constructor() {
        this.metrics = { scrollSpeed: 0, clickAccuracy: 0, preferredDensity: 'normal' };
        this.observers = [];
    }

    trackBehavior() {
        let lastScroll = 0;
        let scrollSamples = [];

        window.addEventListener('scroll', () =&gt; {
            const speed = Math.abs(window.scrollY - lastScroll);
            scrollSamples.push(speed);
            if (scrollSamples.length &gt; 50) scrollSamples.shift();
            this.metrics.scrollSpeed = scrollSamples.reduce((a, b) =&gt; a + b, 0) / scrollSamples.length;
            lastScroll = window.scrollY;
        });

        document.addEventListener('click', (e) =&gt; {
            const target = e.target.closest('button, a, [role="button"]');
            if (target) {
                const rect = target.getBoundingClientRect();
                const hitX = e.clientX - rect.left;
                const hitY = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const accuracy = 1 - (Math.abs(hitX - centerX) / centerX + Math.abs(hitY - centerY) / centerY) / 2;
                this.metrics.clickAccuracy = (this.metrics.clickAccuracy * 0.9) + (accuracy * 0.1);
            }
        });
    }

    computeAdaptations() {
        const adaptations = {};
        if (this.metrics.scrollSpeed &gt; 50) adaptations.contentDensity = 'compact';
        if (this.metrics.clickAccuracy &lt; 0.7) adaptations.touchTargetSize = 'large';
        if (window.innerWidth &lt; 768) adaptations.layout = 'single-column';
        return adaptations;
    }

    apply(adaptations) {
        const root = document.documentElement;
        if (adaptations.contentDensity === 'compact') {
            root.style.setProperty('--content-gap', '0.5rem');
            root.style.setProperty('--card-padding', '0.75rem');
        }
        if (adaptations.touchTargetSize === 'large') {
            root.style.setProperty('--min-touch-target', '48px');
        }
    }
}

const engine = new AdaptiveLayoutEngine();
engine.trackBehavior();
setInterval(() =&gt; engine.apply(engine.computeAdaptations()), 5000);&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: AI-Adaptive Infinite Scroll</h2>

<h3>Step 1: Create the Adaptive Feed Controller</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;class AdaptiveFeed {
    constructor(container, endpoint) {
        this.container = container;
        this.endpoint = endpoint;
        this.cursor = null;
        this.hasMore = true;
        this.loading = false;
        this.adaptations = { cardLayout: 'standard', loadThreshold: 200 };
        this.engagement = { viewTime: {}, clickRate: {} };
    }

    init() {
        this.container.addEventListener('scroll', () =&gt; this.onScroll());
        this.loadItems();
        this.startEngagementTracking();
    }

    onScroll() {
        const { scrollTop, scrollHeight, clientHeight } = this.container;
        if (scrollHeight - scrollTop - clientHeight &lt; this.adaptations.loadThreshold
            &amp;&amp; !this.loading &amp;&amp; this.hasMore) {
            this.loadItems();
        }
    }

    startEngagementTracking() {
        const observer = new IntersectionObserver((entries) =&gt; {
            entries.forEach(entry =&gt; {
                if (entry.isIntersecting) {
                    const id = entry.target.dataset.id;
                    this.engagement.viewTime[id] = Date.now();
                } else if (this.engagement.viewTime[entry.target.dataset.id]) {
                    const viewDuration = Date.now() - this.engagement.viewTime[entry.target.dataset.id];
                    if (viewDuration &gt; 2000) {
                        entry.target.classList.add('high-engagement');
                    }
                }
            });
        }, { threshold: 0.5 });

        this.mutationObserver = new MutationObserver(() =&gt; {
            this.container.querySelectorAll('.feed-item').forEach(el =&gt; observer.observe(el));
        });
        this.mutationObserver.observe(this.container, { childList: true });
    }

    async loadItems() {
        this.loading = true;
        const res = await fetch(this.endpoint + '?cursor=' + this.cursor);
        const data = await res.json();
        data.items.forEach(item =&gt; {
            const el = document.createElement('div');
            el.className = 'feed-item ' + this.adaptations.cardLayout;
            el.dataset.id = item.id;
            el.innerHTML = \`&lt;h3&gt;\${item.title}&lt;/h3&gt;&lt;p&gt;\${item.summary}&lt;/p&gt;\`;
            this.container.appendChild(el);
        });
        this.hasMore = data.hasMore;
        this.cursor = data.nextCursor;
        this.loading = false;
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: CSS with Adaptive Custom Properties</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;:root {
    --content-gap: 1rem;
    --card-padding: 1.5rem;
    --min-touch-target: 44px;
    --load-threshold: 200px;
}

.feed-item {
    padding: var(--card-padding);
    margin-bottom: var(--content-gap);
    transition: all 0.3s ease;
}

.feed-item.compact {
    --card-padding: 0.75rem;
    --content-gap: 0.5rem;
}

.feed-item.high-engagement {
    border-left: 3px solid var(--color-primary);
}

@media (max-width: 768px) {
    .feed-item { grid-template-columns: 1fr; }
}

@container feed-card (min-width: 400px) {
    .feed-item { grid-template-columns: 200px 1fr; }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>AI-driven responsive design creates genuinely adaptive interfaces that optimize themselves for each user. By tracking engagement metrics and adjusting layout properties dynamically, these systems provide better experiences than static breakpoints alone. The adaptive infinite scroll pattern learns from user behavior to optimize loading thresholds, card layouts, and content density in real time.</p>`
  },
  {
    id: 18,
    slug: "web-design-trends-2026-ai-generated-layouts",
    category: "AI Design",
    title: "Web Design Trends 2026: AI-Generated Layouts and Smart Components",
    keyword: "web design trends 2026",
    date: "2026-02-12",
    readTime: "13 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/web-design-trends-2026-ai-generated-layouts.png",
    excerpt: "Explore 2026 web design trends including AI-generated layouts, smart components, spatial interfaces, and data-driven design systems that are reshaping the web.",
    content: `<h2>Introduction</h2>
<p>Web design trends in 2026 are defined by the convergence of AI capabilities with mature CSS features. AI-generated layouts, smart components that adapt to content, spatial interfaces inspired by spatial computing, and data-driven design systems represent the cutting edge of modern web design. Understanding these trends helps teams make informed decisions about which innovations to adopt and which to observe.</p>
<p>This guide covers the most impactful trends with practical implementation examples. Each trend is evaluated for maturity, browser support, and real-world applicability so you can prioritize adoption effectively.</p>

<h2>Best Practices for Modern Web Design</h2>
<ul>
<li><strong>AI-generated layouts as starting points.</strong> Use AI tools to generate initial layouts, then refine with human design expertise. The combination is faster and often more creative than either approach alone.</li>
<li><strong>Smart components respond to content.</strong> Components that adjust their layout based on content length, image aspect ratio, and data density produce more polished results than fixed templates.</li>
<li><strong>Spatial interfaces use depth purposefully.</strong> parallax, layered backgrounds, and 3D transforms should guide attention and create hierarchy, not just add visual noise.</li>
<li><strong>Data-driven design systems evolve continuously.</strong> Track component usage, conversion rates by design variant, and user preference data to inform design system updates.</li>
<li><strong>Sustainable web design matters.</strong> Optimize assets, reduce JavaScript, and implement dark mode by default. Lower carbon footprint is a competitive advantage and ethical obligation.</li>
<li><strong>Motion design with purpose.</strong> Animations should communicate state changes, guide attention, and provide feedback. Remove decorative animations that increase cognitive load.</li>
</ul>

<h2>Code Example: Smart Component System</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;class SmartCard extends HTMLElement {
    static observedAttributes = ['data-density', 'data-engagement'];

    connectedCallback() {
        this.analyzeContent();
        this.render();
    }

    analyzeContent() {
        const title = this.querySelector('[slot="title"]')?.textContent || '';
        const body = this.querySelector('[slot="body"]')?.textContent || '';
        const images = this.querySelectorAll('img').length;

        this.dataset.density = body.length &gt; 200 ? 'dense' : body.length &gt; 80 ? 'normal' : 'minimal';
        this.dataset.hasImages = images &gt; 0 ? 'true' : 'false';
        this.dataset.titleLength = title.length &gt; 40 ? 'long' : 'short';
    }

    render() {
        const density = this.dataset.density;
        this.style.setProperty('--card-gap', density === 'dense' ? '1.5rem' : '1rem');
        this.style.setProperty('--title-size', this.dataset.titleLength === 'long' ? '1rem' : '1.25rem');
        this.style.setProperty('--body-lines', density === 'dense' ? '5' : '3');
    }
}

customElements.define('smart-card', SmartCard);&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll Smart Gallery</h2>

<h3>Step 1: Create the Smart Gallery Engine</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;class SmartGallery {
    constructor(container, endpoint) {
        this.container = container;
        this.endpoint = endpoint;
        this.cursor = null;
        this.hasMore = true;
        this.loading = false;
        this.layoutEngine = new LayoutEngine();
    }

    init() {
        this.container.addEventListener('scroll', () =&gt; this.onScroll());
        this.loadBatch();
    }

    onScroll() {
        const { scrollTop, scrollHeight, clientHeight } = this.container;
        if (scrollHeight - scrollTop - clientHeight &lt; 300 &amp;&amp; !this.loading &amp;&amp; this.hasMore) {
            this.loadBatch();
        }
    }

    async loadBatch() {
        this.loading = true;
        const res = await fetch(this.endpoint + '?cursor=' + this.cursor);
        const data = await res.json();

        const fragment = document.createDocumentFragment();
        data.items.forEach(item =&gt; {
            const card = document.createElement('smart-card');
            card.innerHTML = \`
                &lt;span slot="title"&gt;\${item.title}&lt;/span&gt;
                &lt;div slot="body"&gt;\${item.description}&lt;/div&gt;
                \${item.image ? \`&lt;img src="\${item.image}" alt="\${item.title}" /&gt;\` : ''}
            \`;
            fragment.appendChild(card);
        });

        this.layoutEngine.arrange(fragment, this.container);
        this.hasMore = data.hasMore;
        this.cursor = data.nextCursor;
        this.loading = false;
    }
}

class LayoutEngine {
    arrange(fragment, container) {
        const grid = container.querySelector('.gallery-grid') || this.createGrid(container);
        grid.appendChild(fragment);
    }

    createGrid(container) {
        const grid = document.createElement('div');
        grid.className = 'gallery-grid';
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem;';
        container.appendChild(grid);
        return grid;
    }
}

new SmartGallery(document.getElementById('gallery'), '/api/content').init();&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: CSS for Smart Components</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;smart-card {
    display: block;
    container-type: inline-size;
    background: rgba(45, 54, 56, 0.6);
    border: 1px solid rgba(65, 73, 58, 0.2);
    border-radius: 1rem;
    padding: var(--card-gap, 1rem);
    transition: all 0.3s ease;
}

smart-card:hover {
    border-color: rgba(173, 255, 133, 0.3);
    transform: translateY(-2px);
}

smart-card[data-density="dense"] { grid-column: span 1; }
smart-card[data-has-images="true"][data-density="dense"] { grid-row: span 2; }

smart-card [slot="title"] {
    display: block;
    font-size: var(--title-size, 1.25rem);
    font-weight: 700;
    color: #dae4e7;
    font-family: "Space Grotesk", sans-serif;
}

smart-card [slot="body"] {
    display: -webkit-box;
    -webkit-line-clamp: var(--body-lines, 3);
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #c0cab6;
    font-size: 0.875rem;
    line-height: 1.6;
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Web design in 2026 is characterized by intelligence and adaptability. AI-generated layouts accelerate the design process, smart components respond to their content, and data-driven systems evolve continuously. The smart gallery pattern demonstrates how these trends compose — AI generates the content, smart components adapt their presentation, and infinite scroll makes the collection explorable without pagination friction.</p>`
  },
  {
    id: 19,
    slug: "webassembly-production-high-performance-apps",
    category: "Advanced Coding",
    title: "WebAssembly in Production: High-Performance Web Applications",
    keyword: "WebAssembly production",
    date: "2026-02-08",
    readTime: "15 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/webassembly-production-high-performance-apps.png",
    excerpt: "Deploy WebAssembly in production applications. Learn compilation strategies, memory management, JavaScript interop, and real-world performance optimization patterns.",
    content: `<h2>Introduction</h2>
<p>WebAssembly (Wasm) delivers near-native performance in the browser, enabling applications that were previously impossible on the web: real-time video processing, physics simulations, game engines, and computationally intensive data analysis. Production WebAssembly requires understanding compilation strategies, memory management, and efficient JavaScript interop patterns that differ fundamentally from JavaScript development.</p>
<p>This guide covers practical WebAssembly development using Rust and AssemblyScript, focusing on patterns that production applications need: memory safety, efficient data transfer with JavaScript, streaming compilation, and worker thread deployment.</p>

<h2>Best Practices for WebAssembly</h2>
<ul>
<li><strong>Choose the right language for your use case.</strong> Rust for memory safety and performance. AssemblyScript for TypeScript-like syntax. C/C++ for existing codebases. Go for rapid development.</li>
<li><strong>Minimize JS-Wasm boundary crossings.</strong> Passing data between JavaScript and Wasm has overhead. Batch operations and transfer ArrayBuffers rather than individual values.</li>
<li><strong>Use streaming compilation.</strong> WebAssembly.compileStreaming() overlaps network transfer with compilation, reducing startup time by 50% or more.</li>
<li><strong>Run Wasm in Web Workers.</strong> Heavy computation should run off the main thread. PostMessage transfers SharedArrayBuffer for zero-copy data sharing.</li>
<li><strong>Use wasm-bindgen for Rust.</strong> Generates JavaScript bindings automatically, handles string conversion, and provides ergonomic APIs for calling Wasm from JavaScript.</li>
<li><strong>Profile with wasm-opt.</strong> Binaryen's wasm-opt tool optimizes Wasm binaries further, reducing size by 10-40% and improving runtime performance.</li>
</ul>

<h2>Code Example: Rust Wasm Image Processor</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;// src/lib.rs
use wasm_bindgen::prelude::*;
use web_sys::ImageData;

#[wasm_bindgen]
pub fn apply_blur(data: &amp;mut [u8], width: u32, height: u32, radius: u32) {
    let mut buffer = data.to_vec();
    for y in 0..height {
        for x in 0..width {
            let mut r = 0u32;
            let mut g = 0u32;
            let mut b = 0u32;
            let mut count = 0u32;
            for dy in -(radius as i32)..=(radius as i32) {
                for dx in -(radius as i32)..=(radius as i32) {
                    let nx = x as i32 + dx;
                    let ny = y as i32 + dy;
                    if nx &gt;= 0 &amp;&amp; nx &lt; width as i32 &amp;&amp; ny &gt;= 0 &amp;&amp; ny &lt; height as i32 {
                        let idx = (ny as u32 * width + nx as u32) as usize * 4;
                        r += data[idx] as u32;
                        g += data[idx + 1] as u32;
                        b += data[idx + 2] as u32;
                        count += 1;
                    }
                }
            }
            let idx = (y * width + x) as usize * 4;
            buffer[idx] = (r / count) as u8;
            buffer[idx + 1] = (g / count) as u8;
            buffer[idx + 2] = (b / count) as u8;
        }
    }
    data.copy_from_slice(&amp;buffer);
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Wasm-Powered Infinite Scroll Data Processor</h2>

<h3>Step 1: Rust Data Processing Module</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;// data_processor.rs
use wasm_bindgen::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct DataItem {
    pub id: String,
    pub value: f64,
    pub category: String,
}

#[derive(Serialize)]
pub struct ProcessedBatch {
    pub items: Vec&lt;DataItem&gt;,
    pub stats: Stats,
}

#[derive(Serialize)]
pub struct Stats {
    pub mean: f64,
    pub median: f64,
    pub std_dev: f64,
}

#[wasm_bindgen]
pub fn process_batch(json: &amp;str) -&gt; String {
    let items: Vec&lt;DataItem&gt; = serde_json::from_str(json).unwrap();
    let values: Vec&lt;f64&gt; = items.iter().map(|i| i.value).collect();
    let mean = values.iter().sum::&lt;f64&gt;() / values.len() as f64;
    let mut sorted = values.clone();
    sorted.sort_by(|a, b| a.partial_cmp(b).unwrap());
    let median = sorted[sorted.len() / 2];
    let variance = values.iter().map(|v| (v - mean).powi(2)).sum::&lt;f64&gt;() / values.len() as f64;
    let std_dev = variance.sqrt();

    serde_json::to_string(&amp;ProcessedBatch {
        items,
        stats: Stats { mean, median, std_dev }
    }).unwrap()
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: JavaScript Worker with Wasm</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;// wasm-worker.js
import init, { process_batch } from './pkg/data_processor.js';

let ready = false;
init().then(() =&gt; { ready = true; });

self.onmessage = async (e) =&gt; {
    if (!ready) return;
    const { type, data } = e.data;
    if (type === 'process') {
        const result = process_batch(JSON.stringify(data));
        self.postMessage({ type: 'processed', data: JSON.parse(result) });
    }
};

// Main thread
const worker = new Worker('./wasm-worker.js', { type: 'module' });

class WasmInfiniteFeed {
    constructor(container) {
        this.container = container;
        this.cursor = null;
        this.hasMore = true;
        this.loading = false;
        this.worker = new Worker('./wasm-worker.js', { type: 'module' });
        this.worker.onmessage = (e) =&gt; this.onProcessed(e.data);
    }

    init() {
        this.container.addEventListener('scroll', () =&gt; this.onScroll());
        this.loadNext();
    }

    onScroll() {
        const { scrollTop, scrollHeight, clientHeight } = this.container;
        if (scrollHeight - scrollTop - clientHeight &lt; 200 &amp;&amp; !this.loading &amp;&amp; this.hasMore) {
            this.loadNext();
        }
    }

    async loadNext() {
        this.loading = true;
        const res = await fetch('/api/data?cursor=' + this.cursor);
        const data = await res.json();
        this.worker.postMessage({ type: 'process', data: data.items });
        this.hasMore = data.hasMore;
        this.cursor = data.nextCursor;
    }

    onProcessed({ data }) {
        data.items.forEach(item =&gt; {
            const el = document.createElement('div');
            el.className = 'data-item';
            el.innerHTML = \`&lt;span&gt;\${item.id}&lt;/span&gt;&lt;span&gt;\${item.value.toFixed(2)}&lt;/span&gt;\`;
            this.container.appendChild(el);
        });
        const statsEl = document.getElementById('stats');
        if (statsEl) statsEl.textContent = \`Mean: \${data.stats.mean.toFixed(2)} | Median: \${data.stats.median.toFixed(2)}\`;
        this.loading = false;
    }
}

new WasmInfiniteFeed(document.getElementById('feed')).init();&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>WebAssembly in production delivers measurable performance improvements for compute-intensive tasks. The combination of Rust's safety guarantees, Web Workers for off-main-thread execution, and efficient data transfer patterns creates applications that feel native. The infinite scroll data processor demonstrates how Wasm handles heavy computation while JavaScript manages the UI, each doing what it does best.</p>`
  },
  {
    id: 20,
    slug: "advanced-typescript-patterns-generics-mapped-types",
    category: "Advanced Coding",
    title: "Advanced TypeScript Patterns: Generics, Mapped Types, and Conditional Types",
    keyword: "advanced TypeScript patterns",
    date: "2026-02-04",
    readTime: "16 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/advanced-typescript-patterns-generics-mapped-types.png",
    excerpt: "Master advanced TypeScript patterns including generic constraints, mapped types, conditional types, template literal types, and type-safe API client generation.",
    content: `<h2>Introduction</h2>
<p>Advanced TypeScript patterns transform the type system from a bug-catching tool into a powerful design instrument. Generic constraints ensure type safety across reusable code, mapped types transform existing types programmatically, conditional types enable type-level logic, and template literal types provide string manipulation at the type level. Together, these features enable building APIs that are both flexible and perfectly typed.</p>
<p>This guide covers the most impactful advanced patterns with practical examples drawn from real production codebases. Each pattern solves a real problem and demonstrates TypeScript's type system capabilities at their best.</p>

<h2>Best Practices for Advanced TypeScript</h2>
<ul>
<li><strong>Use generic constraints to enforce interfaces.</strong> &lt;T extends Base&gt; ensures T has the properties your generic code needs while preserving the specific type for consumers.</li>
<li><strong>Mapped types transform types declaratively.</strong> Use keyof, Pick, Omit, Record, and custom mapped types to derive new types from existing ones. This prevents duplication and keeps types synchronized.</li>
<li><strong>Conditional types enable type-level branching.</strong> T extends U ? X : Y lets you create types that behave differently based on their input, enabling sophisticated type-level programming.</li>
<li><strong>Template literal types for string manipulation.</strong> Types like \\\`\\\${Prefix}\\\${Suffix}\\\` provide compile-time string construction and validation.</li>
<li><strong>Use const assertions for narrowing.</strong> as const locks object types to their literal values, enabling exhaustiveness checking and pattern matching.</li>
<li><strong>Builder pattern with chained generics.</strong> Each method returns a new builder type that tracks accumulated state, providing full type safety through a fluent API.</li>
</ul>

<h2>Code Example: Type-Safe Event System</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;type EventMap = {
    'user:login': { userId: string; timestamp: number };
    'user:logout': { userId: string };
    'data:updated': { table: string; recordId: string };
    'error:occurred': { code: number; message: string };
};

class TypedEmitter&lt;T extends Record&lt;string, any&gt;&gt; {
    private handlers = new Map&lt;keyof T, Set&lt;Function&gt;&gt;();

    on&lt;K extends keyof T&gt;(event: K, handler: (payload: T[K]) =&gt; void): () =&gt; void {
        if (!this.handlers.has(event)) this.handlers.set(event, new Set());
        this.handlers.get(event)!.add(handler);
        return () =&gt; this.handlers.get(event)?.delete(handler);
    }

    emit&lt;K extends keyof T&gt;(event: K, payload: T[K]): void {
        this.handlers.get(event)?.forEach(fn =&gt; fn(payload));
    }
}

// Usage: fully typed event handlers
const emitter = new TypedEmitter&lt;EventMap&gt;();
emitter.on('user:login', (data) =&gt; {
    console.log(data.userId); // typed as string
    console.log(data.timestamp); // typed as number
});
// emitter.emit('user:login', { userId: 123 }); // Error: number not assignable to string&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Type-Safe Infinite Scroll with Generic Pagination</h2>

<h3>Step 1: Define the Generic Pagination Types</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;interface PaginatedResponse&lt;T&gt; {
    items: T[];
    hasMore: boolean;
    nextCursor: string | null;
    total: number;
}

type FetchFn&lt;T&gt; = (cursor: string | null, limit: number) =&gt; Promise&lt;PaginatedResponse&lt;T&gt;&gt;;

interface InfiniteScrollConfig&lt;T&gt; {
    fetch: FetchFn&lt;T&gt;;
    pageSize?: number;
    threshold?: number;
    renderItem: (item: T, index: number) =&gt; HTMLElement;
    onStats?: (stats: { loaded: number; total: number }) =&gt; void;
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Type-Safe Scroll Controller</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;class InfiniteScrollController&lt;T&gt; {
    private items: T[] = [];
    private cursor: string | null = null;
    private hasMore = true;
    private loading = false;
    private config: Required&lt;InfiniteScrollConfig&lt;T&gt;&gt;;

    constructor(
        private container: HTMLElement,
        config: InfiniteScrollConfig&lt;T&gt;
    ) {
        this.config = {
            pageSize: 20,
            threshold: 200,
            onStats: () =&gt; {},
            ...config
        };
        this.init();
    }

    private init(): void {
        this.container.style.overflowY = 'auto';
        this.container.addEventListener('scroll', () =&gt; this.onScroll());
        this.loadNext();
    }

    private onScroll(): void {
        const { scrollTop, scrollHeight, clientHeight } = this.container;
        if (scrollHeight - scrollTop - clientHeight &lt; this.config.threshold
            &amp;&amp; !this.loading &amp;&amp; this.hasMore) {
            this.loadNext();
        }
    }

    private async loadNext(): Promise&lt;void&gt; {
        this.loading = true;
        try {
            const result = await this.config.fetch(this.cursor, this.config.pageSize);
            result.items.forEach((item, i) =&gt; {
                const el = this.config.renderItem(item, this.items.length + i);
                this.container.appendChild(el);
            });
            this.items.push(...result.items);
            this.hasMore = result.hasMore;
            this.cursor = result.nextCursor;
            this.config.onStats({
                loaded: this.items.length,
                total: result.total
            });
        } catch (err) {
            console.error('Infinite scroll error:', err);
        }
        this.loading = false;
    }

    reset(): void {
        this.items = [];
        this.cursor = null;
        this.hasMore = true;
        this.container.innerHTML = '';
        this.loadNext();
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Usage with Full Type Safety</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
}

const fetchProducts: FetchFn&lt;Product&gt; = async (cursor, limit) =&gt; {
    const params = new URLSearchParams({ limit: String(limit) });
    if (cursor) params.set('cursor', cursor);
    return fetch('/api/products?' + params).then(r =&gt; r.json());
};

const scroll = new InfiniteScrollController&lt;Product&gt;(
    document.getElementById('products')!,
    {
        fetch: fetchProducts,
        pageSize: 25,
        renderItem: (product) =&gt; {
            const el = document.createElement('div');
            el.className = 'product-row';
            el.innerHTML = \`&lt;h3&gt;\${product.name}&lt;/h3&gt;&lt;span&gt;$\${product.price}&lt;/span&gt;\`;
            return el;
        },
        onStats: ({ loaded, total }) =&gt; {
            document.getElementById('counter')!.textContent = \`\${loaded} of \${total}\`;
        }
    }
);&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Advanced TypeScript patterns provide compile-time guarantees that prevent entire categories of bugs. The generic infinite scroll controller demonstrates how TypeScript ensures the fetch function, render function, and statistics callback all share the same data type. This level of type safety makes refactoring fearless and catches integration errors before they reach production.</p>`
  }
];

export default blogPosts2;
