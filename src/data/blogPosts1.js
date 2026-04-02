const blogPosts1 = [
  {
    id: 1,
    slug: "salesforce-apex-best-practices",
    category: "Salesforce",
    title: "Salesforce Apex Best Practices: Writing Clean, Scalable Code",
    keyword: "Salesforce Apex best practices",
    date: "2026-03-25",
    readTime: "14 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Master Salesforce Apex development with proven best practices for writing clean, scalable, and maintainable code that handles enterprise-grade workloads.",
    content: `<h2>Introduction</h2>
<p>Salesforce Apex best practices are not just suggestions — they are the difference between a system that scales gracefully and one that collapses under load. As organizations increasingly rely on Salesforce as their core business platform, the quality of Apex code directly impacts user experience, data integrity, and system performance. Whether you are building custom triggers, batch processes, or REST API endpoints, the principles outlined in this guide will help you write production-ready code.</p>
<p>In this comprehensive guide, we will cover the most critical Salesforce Apex best practices that every developer should follow. From bulkification and governor limit awareness to proper error handling and testing strategies, each section includes practical examples you can apply immediately. These practices are drawn from real-world enterprise implementations where code quality directly translated to business outcomes.</p>

<h2>Core Best Practices for Apex Development</h2>
<ul>
<li><strong>Always bulkify your code.</strong> Salesforce processes records in batches. A trigger that handles one record at a time will fail when processing 200 records. Design every trigger, method, and class to handle collections of records efficiently.</li>
<li><strong>Use SOQL queries outside loops.</strong> Moving a single SOQL query from inside a loop to outside can save 100+ governor limit queries. Cache query results in maps for O(1) lookups.</li>
<li><strong>Leverage custom settings and custom metadata types.</strong> Store configuration values, thresholds, and environment-specific data in custom metadata rather than hardcoding values. This makes your code configurable without deployment.</li>
<li><strong>Implement the trigger framework pattern.</strong> Never put business logic directly in triggers. Use a handler class pattern that separates trigger events from business logic, enabling recursion control and easier testing.</li>
<li><strong>Write comprehensive test classes.</strong> Aim for 90%+ code coverage with meaningful assertions. Use @testSetup for common data, test bulk scenarios, and validate both positive and negative outcomes.</li>
<li><strong>Use Database methods with allOrNone set to false.</strong> When performing DML operations on collections, use Database.insert(records, false) to allow partial success and capture detailed error information for each record.</li>
<li><strong>Implement proper exception handling.</strong> Create custom exception classes, log errors to a custom object, and provide meaningful error messages that help administrators diagnose issues quickly.</li>
<li><strong>Profile and optimize SOQL queries.</strong> Use the Query Plan tool to identify full table scans. Add selective filters, use indexed fields, and consider skinny tables for frequently queried combinations.</li>
</ul>

<h2>Code Example: Trigger Handler Framework</h2>
<pre><code>&lt;!-- Trigger Handler Base Class --&gt;
&lt;pre&gt;&lt;code&gt;public virtual class TriggerHandler {
    public void run() {
        switch on Trigger.operationType {
            when BEFORE_INSERT { beforeInsert(); }
            when BEFORE_UPDATE { beforeUpdate(); }
            when AFTER_INSERT { afterInsert(); }
            when AFTER_UPDATE { afterUpdate(); }
            when AFTER_DELETE { afterDelete(); }
        }
    }
    protected virtual void beforeInsert() {}
    protected virtual void beforeUpdate() {}
    protected virtual void afterInsert() {}
    protected virtual void afterUpdate() {}
    protected virtual void afterDelete() {}
}&lt;/code&gt;&lt;/pre&gt;

&lt;!-- Implementation Example --&gt;
&lt;pre&gt;&lt;code&gt;public class AccountTriggerHandler extends TriggerHandler {
    protected override void beforeInsert() {
        AccountService.validateAccounts(
            (List&lt;Account&gt;)Trigger.new
        );
    }
    protected override void afterUpdate() {
        AccountService.syncRelatedContacts(
            (Map&lt;Id, Account&gt;)Trigger.newMap,
            (Map&lt;Id, Account&gt;)Trigger.oldMap
        );
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Implementing Infinite Scrolling for Salesforce Record Lists</h2>
<p>When building custom Lightning Web Components that display Salesforce records, infinite scrolling provides a seamless user experience. Here is how to implement it with Apex and LWC.</p>

<h3>Step 1: Create the Apex Controller with OFFSET</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List&lt;Account&gt; getAccounts(Integer offset, Integer limit) {
        return [
            SELECT Id, Name, Industry, AnnualRevenue
            FROM Account
            ORDER BY Name
            LIMIT :limit
            OFFSET :offset
        ];
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the LWC with Scroll Detection</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class InfiniteAccountList extends LightningElement {
    accounts = [];
    offset = 0;
    pageSize = 20;
    isLoading = false;
    hasMore = true;

    connectedCallback() {
        this.loadMore();
    }

    renderedCallback() {
        const container = this.template.querySelector('.scroll-container');
        if (container) {
            container.onscroll = () =&gt; this.handleScroll(container);
        }
    }

    handleScroll(container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollHeight - scrollTop - clientHeight &lt; 100 &amp;&amp; !this.isLoading &amp;&amp; this.hasMore) {
            this.loadMore();
        }
    }

    async loadMore() {
        this.isLoading = true;
        try {
            const result = await getAccounts({ offset: this.offset, limit: this.pageSize });
            this.accounts = [...this.accounts, ...result];
            this.offset += result.length;
            this.hasMore = result.length === this.pageSize;
        } catch (error) {
            console.error('Error loading accounts:', error);
        }
        this.isLoading = false;
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Add the Scroll Container Template</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;&lt;template&gt;
    &lt;div class="scroll-container" style="height: 600px; overflow-y: auto;"&gt;
        &lt;template for:each={accounts} for:item="account"&gt;
            &lt;div key={account.Id} class="slds-card slds-m-bottom_small slds-p-around_medium"&gt;
                &lt;h3&gt;{account.Name}&lt;/h3&gt;
                &lt;p&gt;Industry: {account.Industry}&lt;/p&gt;
                &lt;p&gt;Revenue: {account.AnnualRevenue}&lt;/p&gt;
            &lt;/div&gt;
        &lt;/template&gt;
        &lt;template if:true={isLoading}&gt;
            &lt;lightning-spinner alternative-text="Loading..."&gt;&lt;/lightning-spinner&gt;
        &lt;/template&gt;
    &lt;/div&gt;
&lt;/template&gt;&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 4: Add Debounce for Performance</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;handleScroll(container) {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() =&gt; {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollHeight - scrollTop - clientHeight &lt; 100 &amp;&amp; !this.isLoading &amp;&amp; this.hasMore) {
            this.loadMore();
        }
    }, 150);
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Following these Salesforce Apex best practices ensures your code handles enterprise-scale workloads efficiently. The trigger handler framework, bulkification patterns, and infinite scroll implementation demonstrated here are production-tested patterns used across dozens of Salesforce implementations. Apply these principles consistently, and your Apex code will be maintainable, performant, and reliable.</p>`
  },
  {
    id: 2,
    slug: "salesforce-lightning-web-components-guide",
    category: "Salesforce",
    title: "Salesforce Lightning Web Components: A Complete Developer Guide",
    keyword: "Salesforce Lightning Web Components",
    date: "2026-03-22",
    readTime: "16 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Build modern Salesforce UIs with Lightning Web Components. This guide covers component architecture, lifecycle hooks, data binding, and real-world patterns.",
    content: `<h2>Introduction</h2>
<p>Salesforce Lightning Web Components (LWC) represent the modern standard for building user interfaces on the Salesforce platform. Built on web standards — Custom Elements, Shadow DOM, and ES Modules — LWC provides a lightweight, high-performance component model that feels familiar to developers coming from React, Vue, or vanilla JavaScript backgrounds. Since its general availability, LWC has replaced Aura as the recommended framework for new Salesforce UI development.</p>
<p>This guide goes beyond the basics to cover real-world patterns that production applications demand. We will explore component composition, data binding strategies, wire service customization, event handling, and performance optimization. Every concept includes code examples you can use as starting points for your own components.</p>

<h2>Best Practices for Lightning Web Components</h2>
<ul>
<li><strong>Keep components small and focused.</strong> Each component should do one thing well. Compose complex UIs from small, reusable components rather than building monolithic components.</li>
<li><strong>Use the wire service for data access.</strong> The @wire decorator provides reactive data binding, caching, and automatic refresh when related data changes. Prefer it over imperative Apex calls when possible.</li>
<li><strong>Leverage Lightning Data Service (LDS).</strong> For CRUD operations on single records, use Lightning Data Service instead of custom Apex. It provides built-in caching, record type support, and UI API integration.</li>
<li><strong>Design for accessibility from the start.</strong> Use semantic HTML, ARIA attributes, and the Lightning Design System components that have accessibility built in. Test with screen readers.</li>
<li><strong>Minimize DOM manipulations.</strong> Let the reactive rendering engine handle updates. Avoid direct DOM queries and manipulations except when integrating with third-party libraries.</li>
<li><strong>Use CSS custom properties for theming.</strong> LWC supports CSS custom properties, enabling consistent theming across components without inline styles.</li>
<li><strong>Implement error boundaries.</strong> Handle errors gracefully at the component level. Display user-friendly messages and log errors for debugging.</li>
</ul>

<h2>Code Example: Reactive Data Component</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;import { LightningElement, wire, track } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getContacts from '@salesforce/apex/ContactController.getContacts';

export default class ContactDirectory extends LightningElement {
    @track contacts = [];
    searchTerm = '';
    wiredContactsResult;

    @wire(getContacts, { searchKey: '$searchTerm' })
    wiredContacts(result) {
        this.wiredContactsResult = result;
        if (result.data) {
            this.contacts = result.data;
        }
    }

    handleSearch(event) {
        this.searchTerm = event.target.value;
    }

    async handleRefresh() {
        await refreshApex(this.wiredContactsResult);
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scrolling Contact List in LWC</h2>

<h3>Step 1: Create the Apex Data Provider</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;public with sharing class ContactController {
    @AuraEnabled
    public static List&lt;Contact&gt; getContactsPaginated(String searchKey, Integer offset, Integer limitSize) {
        String searchPattern = '%' + searchKey + '%';
        return [
            SELECT Id, Name, Email, Phone, Title
            FROM Contact
            WHERE Name LIKE :searchPattern
            ORDER BY Name
            LIMIT :limitSize
            OFFSET :offset
        ];
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Infinite Scroll Component</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;import { LightningElement } from 'lwc';
import getContactsPaginated from '@salesforce/apex/ContactController.getContactsPaginated';

export default class InfiniteContacts extends LightningElement {
    contacts = [];
    offset = 0;
    pageSize = 25;
    isLoading = false;
    hasMore = true;
    searchTerm = '';

    connectedCallback() {
        this.loadData();
    }

    handleScroll(event) {
        const container = event.target;
        const threshold = 50;
        const atBottom = container.scrollHeight - container.scrollTop - container.clientHeight &lt; threshold;
        if (atBottom &amp;&amp; !this.isLoading &amp;&amp; this.hasMore) {
            this.loadData();
        }
    }

    async loadData() {
        this.isLoading = true;
        try {
            const data = await getContactsPaginated({
                searchKey: this.searchTerm,
                offset: this.offset,
                limitSize: this.pageSize
            });
            this.contacts = [...this.contacts, ...data];
            this.offset += data.length;
            this.hasMore = data.length === this.pageSize;
        } catch (error) {
            console.error('Load error:', error);
        }
        this.isLoading = false;
    }

    handleSearch(event) {
        this.searchTerm = event.target.value;
        this.contacts = [];
        this.offset = 0;
        this.hasMore = true;
        this.loadData();
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Template with Scroll Container</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;&lt;template&gt;
    &lt;lightning-input type="search" placeholder="Search contacts..."
        value={searchTerm} onchange={handleSearch}&gt;
    &lt;/lightning-input&gt;
    &lt;div class="scroll-container" style="height:500px;overflow-y:auto;"
        onscroll={handleScroll}&gt;
        &lt;template for:each={contacts} for:item="c"&gt;
            &lt;div key={c.Id} class="slds-box slds-m-bottom_x-small"&gt;
                &lt;h3 class="slds-text-heading_small"&gt;{c.Name}&lt;/h3&gt;
                &lt;p&gt;{c.Email} | {c.Phone}&lt;/p&gt;
            &lt;/div&gt;
        &lt;/template&gt;
        &lt;template if:true={isLoading}&gt;
            &lt;div class="slds-text-align_center slds-p-around_medium"&gt;
                &lt;lightning-spinner&gt;&lt;/lightning-spinner&gt;
            &lt;/div&gt;
        &lt;/template&gt;
    &lt;/div&gt;
&lt;/template&gt;&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 4: Add IntersectionObserver for Better Performance</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;connectedCallback() {
    this.loadData();
}

renderedCallback() {
    if (!this.observer) {
        const sentinel = this.template.querySelector('.sentinel');
        if (sentinel) {
            this.observer = new IntersectionObserver(entries =&gt; {
                if (entries[0].isIntersecting &amp;&amp; !this.isLoading &amp;&amp; this.hasMore) {
                    this.loadData();
                }
            }, { threshold: 0.1 });
            this.observer.observe(sentinel);
        }
    }
}

disconnectedCallback() {
    if (this.observer) this.observer.disconnect();
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Salesforce Lightning Web Components provide a modern, standards-based approach to building Salesforce UIs. By following the patterns in this guide — reactive data binding, proper lifecycle management, and infinite scroll implementations — you can build components that are performant, accessible, and maintainable. The infinite scroll pattern shown here works for any Salesforce object and can be extended with filters, sorting, and bulk actions.</p>`
  },
  {
    id: 3,
    slug: "salesforce-soql-optimization-tips",
    category: "Salesforce",
    title: "Salesforce SOQL Optimization: Query Performance Tips for Large Datasets",
    keyword: "Salesforce SOQL optimization",
    date: "2026-03-18",
    readTime: "13 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Optimize Salesforce SOQL queries for large datasets with proven techniques including selective filters, indexed fields, query planning, and pagination patterns.",
    content: `<h2>Introduction</h2>
<p>Salesforce SOQL optimization becomes critical when your org grows beyond a few hundred thousand records. What works fine with 10,000 records can timeout entirely with 10 million. Understanding how the Salesforce query optimizer works, which fields are indexed, and how to structure queries for maximum selectivity is essential knowledge for any Salesforce developer working at scale.</p>
<p>This guide covers practical SOQL optimization techniques that have been validated in production environments with tens of millions of records. We will explore the Query Plan tool, selective filter patterns, proper use of indexes, and pagination strategies that keep your queries fast regardless of data volume.</p>

<h2>Best Practices for SOQL Performance</h2>
<ul>
<li><strong>Use the Query Plan tool.</strong> Developer Console's Query Plan tool shows whether your query uses indexes and estimates the cost. Aim for queries that show index usage on leading filters.</li>
<li><strong>Filter on indexed fields first.</strong> Id, Name, CreatedDate, LastModifiedDate, and custom indexed fields should be your leading WHERE clause filters. Queries that filter on indexed fields first are exponentially faster.</li>
<li><strong>Request custom indexes.</strong> Salesforce Support can add custom indexes to fields you frequently filter on. Submit a case with your query patterns and data volumes.</li>
<li><strong>Use DATE literals and functions carefully.</strong> TODAY, LAST_N_DAYS:n, and THIS_MONTH are selective. Functions applied to fields in WHERE clauses prevent index usage.</li>
<li><strong>Limit returned fields.</strong> Only SELECT the fields you need. Reduces serialization time, heap size, and transfer overhead.</li>
<li><strong>Implement cursor-based pagination.</strong> For large datasets, use WHERE clause filters rather than OFFSET. OFFSET has a 2000-row limit and performance degrades with larger offsets.</li>
<li><strong>Aggregate queries wisely.</strong> GROUP BY and aggregate functions can be expensive. Use them with selective WHERE clauses and consider pre-aggregated data in reporting snapshots.</li>
</ul>

<h2>Code Example: Cursor-Based Pagination</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;public with sharing class OptimizedAccountQuery {
    @AuraEnabled
    public static Map&lt;String, Object&gt; getAccountsCursor(String lastId, Integer pageSize) {
        List&lt;Account&gt; accounts;
        if (String.isBlank(lastId)) {
            accounts = [
                SELECT Id, Name, Industry, CreatedDate
                FROM Account
                ORDER BY Id
                LIMIT :pageSize
            ];
        } else {
            accounts = [
                SELECT Id, Name, Industry, CreatedDate
                FROM Account
                WHERE Id &gt; :lastId
                ORDER BY Id
                LIMIT :pageSize
            ];
        }
        return new Map&lt;String, Object&gt;{
            'records' =&gt; accounts,
            'hasMore' =&gt; accounts.size() == pageSize,
            'nextCursor' =&gt; accounts.isEmpty() ? null : accounts[accounts.size()-1].Id
        };
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll with Cursor-Based Pagination</h2>

<h3>Step 1: Create the Cursor Apex Controller</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;public with sharing class CursorPagination {
    private static final Integer MAX_PAGE_SIZE = 200;

    @AuraEnabled(cacheable=false)
    public static Map&lt;String, Object&gt; fetchRecords(
        String objectApiName,
        String fieldsCsv,
        String cursor,
        Integer pageSize
    ) {
        pageSize = Math.min(pageSize, MAX_PAGE_SIZE);
        String query = 'SELECT ' + fieldsCsv + ' FROM ' + objectApiName;
        if (String.isNotBlank(cursor)) {
            query += " WHERE Id &gt; &apos;" + String.escapeSingleQuotes(cursor) + "&apos;";
        }
        query += ' ORDER BY Id LIMIT ' + (pageSize + 1);
        List&lt;SObject&gt; records = Database.query(query);
        Boolean hasMore = records.size() &gt; pageSize;
        if (hasMore) records.remove(records.size() - 1);
        return new Map&lt;String, Object&gt;{
            'records' =&gt; records,
            'hasMore' =&gt; hasMore,
            'nextCursor' =&gt; records.isEmpty() ? null : records[records.size()-1].Id
        };
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the LWC Infinite Scroll</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;import { LightningElement } from 'lwc';
import fetchRecords from '@salesforce/apex/CursorPagination.fetchRecords';

export default class CursorInfiniteList extends LightningElement {
    records = [];
    cursor = null;
    hasMore = true;
    isLoading = false;
    objectName = 'Account';
    fields = 'Id,Name,Industry,AnnualRevenue';

    connectedCallback() { this.loadNext(); }

    handleScroll(e) {
        const el = e.target;
        if (el.scrollHeight - el.scrollTop - el.clientHeight &lt; 80 &amp;&amp; this.hasMore &amp;&amp; !this.isLoading) {
            this.loadNext();
        }
    }

    async loadNext() {
        this.isLoading = true;
        try {
            const result = await fetchRecords({
                objectApiName: this.objectName,
                fieldsCsv: this.fields,
                cursor: this.cursor,
                pageSize: 50
            });
            this.records = [...this.records, ...result.records];
            this.hasMore = result.hasMore;
            this.cursor = result.nextCursor;
        } catch (err) { console.error(err); }
        this.isLoading = false;
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Render the Template</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;&lt;template&gt;
    &lt;div class="scroll-wrapper" style="height:600px;overflow-y:auto;" onscroll={handleScroll}&gt;
        &lt;template for:each={records} for:item="rec"&gt;
            &lt;div key={rec.Id} class="record-row"&gt;
                &lt;span&gt;{rec.Name}&lt;/span&gt;
                &lt;span&gt;{rec.Industry}&lt;/span&gt;
            &lt;/div&gt;
        &lt;/template&gt;
        &lt;template if:true={isLoading}&gt;
            &lt;p class="loading"&gt;Loading more records...&lt;/p&gt;
        &lt;/template&gt;
    &lt;/div&gt;
&lt;/template&gt;&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>SOQL optimization at scale requires understanding Salesforce's indexing model and query optimizer behavior. The cursor-based pagination pattern shown here avoids OFFSET limitations entirely and provides consistent performance regardless of how far users scroll. Combined with selective filters and proper indexing, these techniques keep your queries fast even with millions of records.</p>`
  },
  {
    id: 4,
    slug: "salesforce-rest-api-integration-guide",
    category: "Salesforce",
    title: "Building Custom Salesforce Integrations with REST APIs",
    keyword: "Salesforce REST API integration",
    date: "2026-03-15",
    readTime: "15 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Design and implement robust Salesforce REST API integrations with authentication, error handling, rate limiting, and real-time data synchronization patterns.",
    content: `<h2>Introduction</h2>
<p>Salesforce REST API integration is a cornerstone of modern enterprise architecture. Whether you are connecting Salesforce to an ERP system, syncing data with a marketing platform, or building a custom mobile app, understanding how to design robust integrations is essential. Poorly designed integrations lead to data inconsistencies, governor limit violations, and maintenance nightmares.</p>
<p>This guide covers both inbound integrations (external systems calling Salesforce) and outbound integrations (Salesforce calling external systems). We will explore authentication patterns, error handling strategies, rate limiting, and batch synchronization techniques that ensure data consistency across systems.</p>

<h2>Best Practices for Salesforce API Integration</h2>
<ul>
<li><strong>Use Named Credentials for authentication.</strong> Named Credentials store authentication details securely and handle OAuth token refresh automatically. Never hardcode credentials in Apex.</li>
<li><strong>Implement retry logic with exponential backoff.</strong> External APIs fail. Design your integration to retry failed requests with increasing delays to handle transient errors gracefully.</li>
<li><strong>Respect API rate limits.</strong> Both Salesforce and external APIs have rate limits. Implement queuing and throttling to stay within limits during bulk operations.</li>
<li><strong>Use platform events for real-time sync.</strong> For real-time data synchronization, publish platform events from triggers and consume them with external systems via the CometD protocol.</li>
<li><strong>Log all integration activity.</strong> Create a custom Integration_Log__c object to record request/response data, status codes, and timestamps. This is invaluable for debugging production issues.</li>
<li><strong>Design for idempotency.</strong> Ensure duplicate API calls produce the same result. Use external IDs and upsert operations to prevent duplicate records.</li>
<li><strong>Handle bulk data with the Bulk API.</strong> For data volumes exceeding 10,000 records, use the Bulk API 2.0 instead of REST API to avoid timeout and governor limit issues.</li>
</ul>

<h2>Code Example: Outbound REST Callout with Retry</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;public with sharing class IntegrationService {
    private static final Integer MAX_RETRIES = 3;
    private static final Integer BASE_DELAY_MS = 1000;

    public static HttpResponse callExternalAPI(String endpoint, String method, String body) {
        for (Integer attempt = 0; attempt &lt; MAX_RETRIES; attempt++) {
            try {
                HttpRequest req = new HttpRequest();
                req.setEndpoint('callout:My_Named_Credential/' + endpoint);
                req.setMethod(method);
                req.setHeader('Content-Type', 'application/json');
                if (body != null) req.setBody(body);
                req.setTimeout(30000);

                HttpResponse res = new Http().send(req);
                if (res.getStatusCode() &lt; 300) {
                    logSuccess(endpoint, res.getStatusCode());
                    return res;
                }
                if (res.getStatusCode() == 429 || res.getStatusCode() &gt;= 500) {
                    logRetry(endpoint, attempt, res.getStatusCode());
                    sleep(BASE_DELAY_MS * (attempt + 1));
                    continue;
                }
                logError(endpoint, res.getStatusCode(), res.getBody());
                return res;
            } catch (Exception e) {
                logException(endpoint, e);
                if (attempt == MAX_RETRIES - 1) throw e;
                sleep(BASE_DELAY_MS * (attempt + 1));
            }
        }
        return null;
    }

    private static void sleep(Integer ms) {
        Long start = System.currentTimeMillis();
        while (System.currentTimeMillis() - start &lt; ms) {}
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll for External API Data in Salesforce</h2>

<h3>Step 1: Create the Proxy Apex Controller</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;public with sharing class ExternalDataProxy {
    @AuraEnabled
    public static Map&lt;String, Object&gt; fetchExternalPage(Integer page, Integer perPage) {
        HttpResponse res = IntegrationService.callExternalAPI(
            'data?page=' + page + '&amp;per_page=' + perPage, 'GET', null
        );
        if (res.getStatusCode() == 200) {
            Map&lt;String, Object&gt; parsed = (Map&lt;String, Object&gt;)JSON.deserializeUntyped(res.getBody());
            return new Map&lt;String, Object&gt;{
                'items' =&gt; parsed.get('data'),
                'hasMore' =&gt; (Integer)parsed.get('page') &lt; (Integer)parsed.get('total_pages'),
                'nextPage' =&gt; (Integer)parsed.get('page') + 1
            };
        }
        throw new AuraHandledException('API error: ' + res.getStatusCode());
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the LWC with External Scroll</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;import { LightningElement } from 'lwc';
import fetchExternalPage from '@salesforce/apex/ExternalDataProxy.fetchExternalPage';

export default class ExternalInfiniteList extends LightningElement {
    items = [];
    currentPage = 1;
    hasMore = true;
    isLoading = false;

    connectedCallback() { this.loadPage(); }

    handleScroll(e) {
        const el = e.target;
        if (el.scrollHeight - el.scrollTop - el.clientHeight &lt; 100 &amp;&amp; this.hasMore &amp;&amp; !this.isLoading) {
            this.loadPage();
        }
    }

    async loadPage() {
        this.isLoading = true;
        try {
            const result = await fetchExternalPage({ page: this.currentPage, perPage: 20 });
            this.items = [...this.items, ...result.items];
            this.hasMore = result.hasMore;
            this.currentPage = result.nextPage;
        } catch (err) { console.error(err); }
        this.isLoading = false;
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Template with Loading States</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;&lt;template&gt;
    &lt;div class="data-container" style="height:600px;overflow-y:auto;" onscroll={handleScroll}&gt;
        &lt;template for:each={items} for:item="item"&gt;
            &lt;div key={item.id} class="data-card"&gt;
                &lt;h4&gt;{item.name}&lt;/h4&gt;
                &lt;p&gt;{item.description}&lt;/p&gt;
            &lt;/div&gt;
        &lt;/template&gt;
        &lt;template if:true={isLoading}&gt;
            &lt;div class="loading-indicator"&gt;Fetching more data...&lt;/div&gt;
        &lt;/template&gt;
    &lt;/div&gt;
&lt;/template&gt;&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Robust Salesforce REST API integrations require careful attention to authentication, error handling, and data consistency. The patterns shown here — Named Credentials, retry logic, platform events, and cursor-based pagination — form the foundation of production-grade integrations. The infinite scroll pattern for external data works well for dashboards, data browsers, and monitoring interfaces where users need to explore large datasets from external systems.</p>`
  },
  {
    id: 5,
    slug: "react-19-new-features-developers",
    category: "Web Development",
    title: "React 19 New Features: What Developers Need to Know in 2026",
    keyword: "React 19 new features",
    date: "2026-03-12",
    readTime: "15 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Explore React 19's groundbreaking features including the new compiler, Server Components, Actions, and enhanced hooks that are reshaping frontend development.",
    content: `<h2>Introduction</h2>
<p>React 19 marks the most significant evolution of the React framework since the introduction of hooks. The React Compiler eliminates the need for manual memoization, Server Components change the data fetching paradigm, and Actions simplify form handling and mutations. These features collectively reduce boilerplate, improve performance, and make React applications easier to build and maintain.</p>
<p>This guide provides a practical overview of every major React 19 feature, with code examples showing both the old way and the new way. Whether you are upgrading an existing application or starting fresh, understanding these features will help you write better React code with less effort.</p>

<h2>Best Practices for React 19</h2>
<ul>
<li><strong>Let the React Compiler handle memoization.</strong> Remove useMemo, useCallback, and React.memo from your code. The compiler automatically optimizes re-renders by analyzing your component's data flow at build time.</li>
<li><strong>Use Server Components for data fetching.</strong> Components that fetch data but do not need interactivity should be Server Components. This eliminates the loading spinners and waterfalls associated with client-side fetching.</li>
<li><strong>Adopt Actions for form handling.</strong> The useActionState hook combined with form Actions replaces complex form libraries for most use cases. Pending states, error handling, and optimistic updates are built in.</li>
<li><strong>Leverage the use() hook for promises.</strong> The new use() hook can unwrap promises in components, enabling a cleaner pattern for async data without useEffect.</li>
<li><strong>Use Document Metadata APIs.</strong> Render title, meta, and link tags directly in your components. React hoists them to the document head automatically.</li>
<li><strong>Upgrade gradually.</strong> React 19 is backward compatible. Adopt new features incrementally rather than rewriting everything at once.</li>
</ul>

<h2>Code Example: Actions with useActionState</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;import { useActionState } from 'react';

async function submitContact(prevState, formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify({ name, email })
        });
        if (!res.ok) throw new Error('Submission failed');
        return { success: true, message: 'Thank you!' };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

function ContactForm() {
    const [state, action, pending] = useActionState(submitContact, null);
    return (
        &lt;form action={action}&gt;
            &lt;input name="name" required /&gt;
            &lt;input name="email" type="email" required /&gt;
            &lt;button disabled={pending}&gt;
                {pending ? 'Sending...' : 'Submit'}
            &lt;/button&gt;
            {state?.message &amp;&amp; &lt;p&gt;{state.message}&lt;/p&gt;}
        &lt;/form&gt;
    );
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll with React 19 Patterns</h2>

<h3>Step 1: Create the Server Data Source</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;// app/api/posts/route.js (Next.js 15)
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const cursor = searchParams.get('cursor');
    const limit = parseInt(searchParams.get('limit') || '20');
    const posts = await db.post.findMany({
        take: limit + 1,
        ...(cursor &amp;&amp; { cursor: { id: cursor }, skip: 1 }),
        orderBy: { createdAt: 'desc' }
    });
    const hasMore = posts.length &gt; limit;
    if (hasMore) posts.pop();
    return Response.json({
        posts,
        hasMore,
        nextCursor: posts.length ? posts[posts.length - 1].id : null
    });
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Client Infinite Scroll Component</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;'use client';
import { useState, useRef, useCallback } from 'react';

export function InfinitePostList({ initialPosts, initialCursor }) {
    const [posts, setPosts] = useState(initialPosts);
    const [cursor, setCursor] = useState(initialCursor);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    const lastPostRef = useCallback(node =&gt; {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries =&gt; {
            if (entries[0].isIntersecting &amp;&amp; hasMore) loadMore();
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    async function loadMore() {
        setLoading(true);
        const res = await fetch('/api/posts?cursor=' + cursor + '&amp;limit=20');
        const data = await res.json();
        setPosts(prev =&gt; [...prev, ...data.posts]);
        setCursor(data.nextCursor);
        setHasMore(data.hasMore);
        setLoading(false);
    }

    return (
        &lt;div&gt;
            {posts.map((post, i) =&gt; (
                &lt;article key={post.id} ref={i === posts.length - 1 ? lastPostRef : null}&gt;
                    &lt;h2&gt;{post.title}&lt;/h2&gt;
                    &lt;p&gt;{post.excerpt}&lt;/p&gt;
                &lt;/article&gt;
            ))}
            {loading &amp;&amp; &lt;p&gt;Loading more posts...&lt;/p&gt;}
        &lt;/div&gt;
    );
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Use with Server Component</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;// app/posts/page.js
import { InfinitePostList } from './InfinitePostList';

async function getInitialPosts() {
    const res = await fetch('http://localhost:3000/api/posts?limit=20');
    return res.json();
}

export default async function PostsPage() {
    const { posts, nextCursor, hasMore } = await getInitialPosts();
    return (
        &lt;main&gt;
            &lt;h1&gt;Latest Posts&lt;/h1&gt;
            &lt;InfinitePostList
                initialPosts={posts}
                initialCursor={nextCursor}
            /&gt;
        &lt;/main&gt;
    );
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>React 19 simplifies many patterns that previously required significant boilerplate. The Compiler handles memoization, Actions handle mutations, and Server Components handle data fetching. The infinite scroll example demonstrates how these features compose naturally — server data flows into client components that manage their own scroll state with minimal code. Adopt these patterns incrementally to modernize your React applications.</p>`
  },
  {
    id: 6,
    slug: "react-typescript-best-practices",
    category: "Web Development",
    title: "Building Scalable React Applications with TypeScript",
    keyword: "React TypeScript best practices",
    date: "2026-03-08",
    readTime: "14 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Master React TypeScript patterns for scalable applications. Learn component typing, generic hooks, discriminated unions, and real-world architecture strategies.",
    content: `<h2>Introduction</h2>
<p>React TypeScript best practices go far beyond adding type annotations to props. A well-typed React application catches bugs at compile time, serves as living documentation, and enables powerful refactoring with confidence. However, achieving good TypeScript coverage in React requires understanding specific patterns for components, hooks, context, and state management that differ from vanilla TypeScript usage.</p>
<p>This guide covers the most impactful TypeScript patterns for React applications, from basic prop typing to advanced generic hooks and discriminated unions for state management. Each pattern includes real code examples showing how to apply it effectively.</p>

<h2>Best Practices for React TypeScript</h2>
<ul>
<li><strong>Define prop types with interfaces, not type aliases.</strong> Interfaces provide better error messages, support declaration merging, and are the conventional choice for object shapes in React.</li>
<li><strong>Use generic components for reusable logic.</strong> Components that work with different data types should use generics to maintain type safety while maximizing reusability.</li>
<li><strong>Type event handlers explicitly.</strong> Use React.ChangeEvent&lt;HTMLInputElement&gt; instead of any. This enables autocomplete and catches incorrect event property access.</li>
<li><strong>Use discriminated unions for state.</strong> Represent loading, success, and error states as a union type with a discriminant property. This eliminates impossible states and makes exhaustive checking possible.</li>
<li><strong>Type custom hooks with generics.</strong> Custom hooks that accept and return data should be generic to preserve type information through the hook chain.</li>
<li><strong>Avoid type assertions (as).</strong> Prefer type narrowing with guards and conditional checks. Type assertions bypass the compiler and can hide runtime errors.</li>
<li><strong>Use satisfies for configuration objects.</strong> The satisfies operator validates that an object matches a type while preserving the most specific type for inference.</li>
</ul>

<h2>Code Example: Typed API Hook with Discriminated Union</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;type ApiState&lt;T&gt; =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: string };

function useApi&lt;T&gt;(url: string): ApiState&lt;T&gt; {
    const [state, setState] = useState&lt;ApiState&lt;T&gt;&gt;({ status: 'idle' });

    useEffect(() =&gt; {
        setState({ status: 'loading' });
        fetch(url)
            .then(r =&gt; {
                if (!r.ok) throw new Error(r.statusText);
                return r.json();
            })
            .then(data =&gt; setState({ status: 'success', data }))
            .catch(err =&gt; setState({ status: 'error', error: err.message }));
    }, [url]);

    return state;
}

function UserList() {
    const state = useApi&lt;User[]&gt;('/api/users');
    switch (state.status) {
        case 'loading': return &lt;p&gt;Loading...&lt;/p&gt;;
        case 'error': return &lt;p&gt;Error: {state.error}&lt;/p&gt;;
        case 'success': return state.data.map(u =&gt; &lt;p key={u.id}&gt;{u.name}&lt;/p&gt;);
        default: return null;
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Typed Infinite Scroll Hook</h2>

<h3>Step 1: Define the Types</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;interface PaginatedResponse&lt;T&gt; {
    items: T[];
    hasMore: boolean;
    nextCursor: string | null;
}

interface InfiniteScrollState&lt;T&gt; {
    items: T[];
    cursor: string | null;
    hasMore: boolean;
    loading: boolean;
    error: string | null;
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Create the Generic Hook</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;function useInfiniteScroll&lt;T&gt;(
    fetchFn: (cursor: string | null) =&gt; Promise&lt;PaginatedResponse&lt;T&gt;&gt;
) {
    const [state, setState] = useState&lt;InfiniteScrollState&lt;T&gt;&gt;({
        items: [],
        cursor: null,
        hasMore: true,
        loading: false,
        error: null
    });

    const loadMore = useCallback(async () =&gt; {
        if (state.loading || !state.hasMore) return;
        setState(s =&gt; ({ ...s, loading: true, error: null }));
        try {
            const result = await fetchFn(state.cursor);
            setState(s =&gt; ({
                ...s,
                items: [...s.items, ...result.items],
                cursor: result.nextCursor,
                hasMore: result.hasMore,
                loading: false
            }));
        } catch (err) {
            setState(s =&gt; ({ ...s, loading: false, error: (err as Error).message }));
        }
    }, [state.cursor, state.loading, state.hasMore, fetchFn]);

    const observerRef = useCallback((node: HTMLDivElement | null) =&gt; {
        if (!node || state.loading) return;
        const obs = new IntersectionObserver(entries =&gt; {
            if (entries[0].isIntersecting &amp;&amp; state.hasMore) loadMore();
        });
        obs.observe(node);
        return () =&gt; obs.disconnect();
    }, [loadMore, state.loading, state.hasMore]);

    return { ...state, loadMore, observerRef };
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Use in a Component</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;interface Product { id: string; name: string; price: number; }

function ProductGrid() {
    const fetchProducts = useCallback(
        (cursor: string | null) =&gt;
            fetch('/api/products?cursor=' + cursor).then(r =&gt; r.json()),
        []
    );

    const { items, loading, error, observerRef } = useInfiniteScroll&lt;Product&gt;(fetchProducts);

    return (
        &lt;div className="grid"&gt;
            {items.map((p, i) =&gt; (
                &lt;div key={p.id} ref={i === items.length - 1 ? observerRef : undefined}&gt;
                    &lt;h3&gt;{p.name}&lt;/h3&gt;
                    &lt;span&gt;&#36;{p.price}&lt;/span&gt;
                &lt;/div&gt;
            ))}
            {loading &amp;&amp; &lt;p&gt;Loading...&lt;/p&gt;}
            {error &amp;&amp; &lt;p&gt;Error: {error}&lt;/p&gt;}
        &lt;/div&gt;
    );
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>TypeScript transforms React development from guesswork into a precise discipline. The patterns in this guide — discriminated unions for state, generic hooks for reusable logic, and properly typed event handlers — form the foundation of scalable React TypeScript applications. The typed infinite scroll hook demonstrates how generics enable building reusable, type-safe data loading patterns that work with any data shape.</p>`
  },
  {
    id: 7,
    slug: "css-container-queries-responsive-design",
    category: "Web Development",
    title: "CSS Container Queries: The Future of Responsive Design",
    keyword: "CSS container queries",
    date: "2026-03-05",
    readTime: "12 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Learn CSS container queries for truly component-based responsive design. Break free from viewport-dependent layouts with practical examples and patterns.",
    content: `<h2>Introduction</h2>
<p>CSS container queries solve one of the longest-standing limitations in web design: the inability for a component to respond to its own container's size rather than the viewport. For decades, responsive design meant media queries tied to screen width. A card component that looks great in a full-width layout breaks when placed in a sidebar because it has no way to know it's in a smaller container. Container queries change this fundamentally.</p>
<p>With full browser support across all modern browsers, container queries are now production-ready. This guide covers everything from basic syntax to advanced patterns including container query units, style queries, and practical component architectures that leverage container queries for truly portable, context-aware components.</p>

<h2>Best Practices for Container Queries</h2>
<ul>
<li><strong>Apply container-type to a parent, query from children.</strong> The element with container-type is the query target. Its descendants can query against it using @container rules.</li>
<li><strong>Use container-type: inline-size for layout responsiveness.</strong> This is the most common pattern — components adapting their layout based on available horizontal space.</li>
<li><strong>Name your containers.</strong> When nesting container queries, use container-name to avoid ambiguity about which container is being queried.</li>
<li><strong>Combine with CSS Grid for powerful layouts.</strong> Grid handles the page-level layout while container queries handle component-level adaptation. Each component becomes truly independent.</li>
<li><strong>Use container query length units.</strong> cqw, cqh, cqi, cqb units are relative to the container size, enabling fluid sizing without viewport units.</li>
<li><strong>Progressive enhancement approach.</strong> Provide a reasonable default layout, then enhance with container queries. Use @supports (container-type: inline-size) for fallbacks.</li>
</ul>

<h2>Code Example: Adaptive Card Component</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;.card-container {
    container-type: inline-size;
    container-name: card;
}

.card {
    display: grid;
    gap: 1rem;
    padding: 1rem;
}

/* Default: stacked layout */
.card-image { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.card-body { padding: 0; }

/* Wider than 400px: side-by-side */
@container card (min-width: 400px) {
    .card {
        grid-template-columns: 200px 1fr;
        gap: 1.5rem;
    }
    .card-image { aspect-ratio: 1; height: 100%; }
}

/* Wider than 600px: larger image, more padding */
@container card (min-width: 600px) {
    .card {
        grid-template-columns: 300px 1fr;
        padding: 1.5rem;
    }
    .card-body { padding: 1rem 0; }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll Grid with Container-Responsive Cards</h2>

<h3>Step 1: Set Up the Container Grid</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;.feed-container {
    height: 100vh;
    overflow-y: auto;
    padding: 1rem;
}

.feed-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.feed-item {
    container-type: inline-size;
    container-name: feed-card;
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Infinite Scroll JavaScript</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;class InfiniteFeed {
    constructor(container, apiUrl) {
        this.container = container;
        this.apiUrl = apiUrl;
        this.page = 1;
        this.loading = false;
        this.hasMore = true;
        this.observer = null;
        this.init();
    }

    init() {
        this.container.addEventListener('scroll', () =&gt; this.handleScroll());
        this.loadItems();
    }

    handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = this.container;
        if (scrollHeight - scrollTop - clientHeight &lt; 200 &amp;&amp; !this.loading &amp;&amp; this.hasMore) {
            this.loadItems();
        }
    }

    async loadItems() {
        this.loading = true;
        const res = await fetch(this.apiUrl + '?page=' + this.page);
        const data = await res.json();
        data.items.forEach(item =&gt; {
            const el = this.createCard(item);
            this.container.querySelector('.feed-grid').appendChild(el);
        });
        this.hasMore = data.hasMore;
        this.page++;
        this.loading = false;
    }

    createCard(item) {
        const div = document.createElement('div');
        div.className = 'feed-item';
        div.innerHTML = \`
            &lt;article class="card"&gt;
                &lt;img class="card-image" src="\${item.image}" alt="\${item.title}" /&gt;
                &lt;div class="card-body"&gt;
                    &lt;h3&gt;\${item.title}&lt;/h3&gt;
                    &lt;p&gt;\${item.summary}&lt;/p&gt;
                &lt;/div&gt;
            &lt;/article&gt;
        \`;
        return div;
    }
}

new InfiniteFeed(
    document.querySelector('.feed-container'),
    '/api/feed'
);&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Add Container-Responsive Card Styles</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;@container feed-card (max-width: 350px) {
    .card { grid-template-columns: 1fr; }
    .card-image { aspect-ratio: 16/9; }
    .card-body h3 { font-size: 1rem; }
}

@container feed-card (min-width: 351px) and (max-width: 500px) {
    .card { grid-template-columns: 120px 1fr; }
    .card-image { aspect-ratio: 1; }
}

@container feed-card (min-width: 501px) {
    .card { grid-template-columns: 1fr; }
    .card-image { aspect-ratio: 3/2; }
    .card-body { padding: 1.25rem; }
    .card-body h3 { font-size: 1.25rem; }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>CSS container queries are the biggest leap in responsive design since media queries. By enabling components to respond to their own container rather than the viewport, they make truly portable, context-aware components possible. The infinite scroll grid example shows how cards automatically adapt their layout regardless of where they appear — full-width feed, sidebar widget, or modal preview. This is component-based design done right.</p>`
  },
  {
    id: 8,
    slug: "javascript-es2026-features-explained",
    category: "Web Development",
    title: "Modern JavaScript ES2026: New Syntax and Features Explained",
    keyword: "JavaScript ES2026 features",
    date: "2026-03-01",
    readTime: "13 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Discover JavaScript ES2026 features including pipeline operator, records and tuples, pattern matching, and decorators with practical code examples.",
    content: `<h2>Introduction</h2>
<p>JavaScript ES2026 brings several long-awaited features to the language that significantly improve developer ergonomics and code clarity. The pipeline operator enables readable function composition, decorators provide clean metaprogramming capabilities, and the ongoing proposals for records, tuples, and pattern matching promise to make JavaScript more expressive for complex data manipulation.</p>
<p>This guide covers the most impactful ES2026 features with practical examples. Each feature is shown in the context of real-world usage patterns you can apply in your projects today, using appropriate polyfills and transpiler configurations.</p>

<h2>Best Practices for Modern JavaScript</h2>
<ul>
<li><strong>Use the pipeline operator for data transformations.</strong> Instead of deeply nested function calls or intermediate variables, pipeline makes data flow explicit and readable.</li>
<li><strong>Apply decorators for cross-cutting concerns.</strong> Logging, validation, caching, and authentication decorators replace boilerplate wrapper functions with declarative annotations.</li>
<li><strong>Adopt structuredClone for deep copies.</strong> The built-in structuredClone handles circular references, dates, maps, sets, and other types that JSON.parse(JSON.stringify()) cannot.</li>
<li><strong>Use Array.fromAsync for async iterables.</strong> Convert async iterables to arrays cleanly without manual loop accumulation.</li>
<li><strong>Leverage Promise.withResolvers.</strong> Create externally resolvable promises without the constructor antipattern, improving code that bridges callback and promise APIs.</li>
<li><strong>Use Set methods for collection operations.</strong> union, intersection, difference, and symmetricDifference on Sets replace manual loop-based implementations.</li>
</ul>

<h2>Code Example: Pipeline Operator for Data Processing</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;// Before: nested calls (hard to read)
const result = formatPrice(
    applyDiscount(
        calculateTax(addShipping(basePrice)),
        customerDiscount
    )
);

// After: pipeline operator (reads top to bottom)
const result = basePrice
    |&gt; addShipping
    |&gt; calculateTax
    |&gt; price =&gt; applyDiscount(price, customerDiscount)
    |&gt; formatPrice;

// Async pipeline
const userData = await userId
    |&gt; fetchUser
    |&gt; async (user) =&gt; ({ ...user, orders: await fetchOrders(user.id) })
    |&gt; enrichProfile;&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll with Modern JavaScript Patterns</h2>

<h3>Step 1: Create a Reactive State Store with Decorators</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;function observable(target, context) {
    return class extends target {
        #listeners = new Set();
        #state;
        constructor(...args) {
            super(...args);
            this.#state = this.initialState();
        }
        get state() { return this.#state; }
        setState(updater) {
            const next = typeof updater === 'function' ? updater(this.#state) : updater;
            this.#state = { ...this.#state, ...next };
            this.#listeners.forEach(fn =&gt; fn(this.#state));
        }
        subscribe(fn) {
            this.#listeners.add(fn);
            return () =&gt; this.#listeners.delete(fn);
        }
    };
}

@observable
class InfiniteScrollStore {
    initialState() {
        return { items: [], cursor: null, hasMore: true, loading: false, error: null };
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Data Loader with Pipeline</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;const fetchPage = async (cursor) =&gt; {
    const params = new URLSearchParams({ limit: '20', ...(cursor &amp;&amp; { cursor }) });
    return fetch('/api/items?' + params).then(r =&gt; r.json());
};

const processPage = (response) =&gt; response.items
    |&gt; items =&gt; items.map(normalizeItem)
    |&gt; items =&gt; items.filter(isValid);

const loadMore = async (store) =&gt; {
    if (store.state.loading || !store.state.hasMore) return;
    store.setState({ loading: true, error: null });
    try {
        const data = await fetchPage(store.state.cursor);
        const processed = processPage(data);
        store.setState(s =&gt; ({
            items: [...s.items, ...processed],
            cursor: data.nextCursor,
            hasMore: data.hasMore,
            loading: false
        }));
    } catch (e) {
        store.setState({ loading: false, error: e.message });
    }
};&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Wire Up the Scroll Handler</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;const store = new InfiniteScrollStore();

const render = ({ items, loading, hasMore }) =&gt; {
    const container = document.getElementById('feed');
    container.innerHTML = items.map(item =&gt;
        \`&lt;div class="feed-item"&gt;\${item.title}&lt;/div&gt;\`
    ).join('');
    if (loading) container.innerHTML += '&lt;p class="loading"&gt;Loading...&lt;/p&gt;';
};

store.subscribe(render);

document.querySelector('.scroll-area').addEventListener('scroll', (e) =&gt; {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight &lt; 150) {
        loadMore(store);
    }
});

loadMore(store); // Initial load&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>ES2026 features like the pipeline operator, decorators, and improved Set methods make JavaScript code more expressive and maintainable. The infinite scroll implementation demonstrates how these features compose — decorators handle state reactivity, the pipeline operator makes data transformations readable, and modern async patterns keep the code clean. As these proposals reach stage 4 and browser support expands, adopting them will significantly improve your codebase quality.</p>`
  },
  {
    id: 9,
    slug: "ai-powered-web-design-tools-techniques",
    category: "AI Design",
    title: "AI-Powered Web Design: Tools and Techniques for 2026",
    keyword: "AI web design tools",
    date: "2026-02-25",
    readTime: "14 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Explore AI web design tools transforming how we create websites. From layout generation to color schemes, learn practical techniques for AI-assisted design workflows.",
    content: `<h2>Introduction</h2>
<p>AI web design tools have matured from experimental novelties into production-ready instruments that genuinely accelerate the design process. These tools do not replace designers — they augment human creativity by automating repetitive tasks, generating starting points, and exploring design spaces faster than manual iteration allows. Understanding which tools to use for which tasks, and how to integrate them into your workflow, is now a competitive advantage.</p>
<p>This guide covers the most impactful AI web design tools available in 2026, with practical techniques for integrating them into your design and development workflow. We focus on tools that produce usable, customizable output rather than black-box generators.</p>

<h2>Best Practices for AI-Assisted Design</h2>
<ul>
<li><strong>Use AI for exploration, not final output.</strong> AI generates design options rapidly. Use these as starting points, then refine with your expertise in user needs, brand guidelines, and accessibility requirements.</li>
<li><strong>Provide detailed prompts with context.</strong> Include target audience, brand personality, content hierarchy, and technical constraints in your prompts. Better input produces better output.</li>
<li><strong>Maintain design system consistency.</strong> Feed your existing design tokens, component library, and style guide into AI tools. This ensures generated designs align with your established patterns.</li>
<li><strong>Iterate in layers.</strong> Generate a layout first, then refine colors separately, then typography. Breaking the task into layers gives you more control over each aspect.</li>
<li><strong>Validate AI output for accessibility.</strong> Always check color contrast ratios, keyboard navigation, and screen reader compatibility on AI-generated designs. AI often prioritizes aesthetics over accessibility.</li>
<li><strong>Use AI for responsive adaptation.</strong> AI tools excel at adapting a desktop design to mobile and tablet layouts. Provide your desktop design and request specific breakpoint adaptations.</li>
</ul>

<h2>Code Example: AI Design Token Generator</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;// Generate design tokens from a mood description
async function generateDesignTokens(mood, brandColors) {
    const prompt = \`
        Generate a design token system for a web application.
        Mood: \${mood}
        Brand colors: \${brandColors.join(', ')}
        Output JSON with: colors (primary, secondary, neutral scale),
        spacing (4px base), typography (heading, body, mono),
        borderRadius, shadows.
    \`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + API_KEY
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' }
        })
    });
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}

// Usage
const tokens = await generateDesignTokens('modern, professional, trustworthy', ['#2563eb', '#1e40af']);
console.log(tokens.colors.primary); // AI-generated primary palette
console.log(tokens.typography.heading.fontFamily); // Suggested heading font&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: AI-Generated Infinite Scroll Gallery</h2>

<h3>Step 1: Generate Layout Variations with AI</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;class AIDesignGallery {
    constructor(container) {
        this.container = container;
        this.page = 0;
        this.loading = false;
        this.layouts = [];
    }

    async generateLayout(description) {
        const response = await fetch('/api/ai/generate-layout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: \`Generate a responsive card layout for: \${description}.
                         Return CSS grid config and card component HTML.\`,
                style: 'modern, clean, dark theme'
            })
        });
        return response.json();
    }

    async loadMore() {
        if (this.loading) return;
        this.loading = true;
        const prompts = [
            'e-commerce product cards',
            'blog post previews',
            'portfolio project cards',
            'team member profiles',
            'feature highlight cards'
        ];
        const batch = await Promise.all(
            prompts.slice(this.page * 2, (this.page + 1) * 2)
                .map(p =&gt; this.generateLayout(p))
        );
        batch.forEach(layout =&gt; {
            const wrapper = document.createElement('div');
            wrapper.className = 'layout-preview';
            wrapper.innerHTML = layout.html;
            this.container.appendChild(wrapper);
        });
        this.page++;
        this.loading = false;
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Add Scroll Detection</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;const gallery = new AIDesignGallery(document.querySelector('#gallery'));

const scrollContainer = document.querySelector('#gallery');
scrollContainer.addEventListener('scroll', () =&gt; {
    const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
    if (scrollHeight - scrollTop - clientHeight &lt; 300) {
        gallery.loadMore();
    }
});

gallery.loadMore(); // Initial load&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 3: Style the Gallery</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;#gallery {
    height: 100vh;
    overflow-y: auto;
    background: #0c1517;
    padding: 2rem;
}

.layout-preview {
    background: rgba(45, 54, 56, 0.6);
    border: 1px solid rgba(65, 73, 58, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 2rem;
    backdrop-filter: blur(24px);
    transition: border-color 0.3s, box-shadow 0.3s;
}

.layout-preview:hover {
    border-color: rgba(173, 255, 133, 0.3);
    box-shadow: 0 0 30px rgba(173, 255, 133, 0.1);
}

.layout-preview h3 {
    color: #dae4e7;
    margin-bottom: 1rem;
    font-family: 'Space Grotesk', sans-serif;
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>AI web design tools are most effective when used as creative accelerators rather than replacements for design expertise. The techniques in this guide — generating design tokens, creating layout variations, and building AI-powered galleries — show how AI can augment your workflow while you maintain control over the final output. The infinite scroll gallery pattern demonstrates how to present AI-generated designs in an explorable, performant interface.</p>`
  },
  {
    id: 10,
    slug: "generative-ai-ui-design-prompt-to-production",
    category: "AI Design",
    title: "Generative AI for UI Design: From Prompt to Production",
    keyword: "generative AI UI design",
    date: "2026-02-20",
    readTime: "15 min read",
    author: "Anuhya Digital",
    image: "assets/images/blog/placeholder.png",
    excerpt: "Bridge the gap between AI-generated designs and production code. Learn systematic workflows for converting generative AI output into usable, accessible interfaces.",
    content: `<h2>Introduction</h2>
<p>Generative AI UI design has matured to the point where AI can produce visually compelling interface mockups in seconds. However, the gap between a beautiful AI-generated image and production-ready code remains significant. This guide covers systematic workflows for taking generative AI output from concept to production, ensuring the final product is accessible, performant, and maintainable.</p>
<p>We will explore prompt engineering for UI generation, code extraction techniques, design system integration, and quality assurance processes that ensure AI-assisted designs meet production standards. These patterns work whether you are using Figma AI, v0.dev, Galileo AI, or custom API integrations.</p>

<h2>Best Practices for Generative AI UI Design</h2>
<ul>
<li><strong>Structure prompts with design system constraints.</strong> Include your spacing scale, color tokens, typography stack, and component library references in prompts. This produces output closer to your production standards.</li>
<li><strong>Generate components, not pages.</strong> Request individual components (card, form, navigation) rather than full pages. Smaller outputs are easier to refine and compose.</li>
<li><strong>Specify accessibility requirements in prompts.</strong> Include "with proper ARIA labels", "minimum 4.5:1 contrast ratio", and "keyboard navigable" in your prompts for more accessible output.</li>
<li><strong>Extract and validate design tokens.</strong> Parse AI-generated CSS into your design token format. Validate all color values against WCAG contrast requirements.</li>
<li><strong>Implement a human review gate.</strong> Never ship AI-generated UI without human review. Check for brand consistency, content accuracy, accessibility compliance, and edge case handling.</li>
<li><strong>Version control AI-generated code.</strong> Track which prompts produced which outputs. This enables reproducibility and helps refine prompting strategies over time.</li>
</ul>

<h2>Code Example: Prompt-to-Component Pipeline</h2>
<pre><code>&lt;pre&gt;&lt;code&gt;class UIGenerator {
    constructor(apiKey, designTokens) {
        this.apiKey = apiKey;
        this.tokens = designTokens;
    }

    async generateComponent(description, componentType) {
        const systemPrompt = \`You are a UI code generator.
        Design tokens: \${JSON.stringify(this.tokens)}
        Output: Clean semantic HTML with Tailwind CSS classes.
        Accessibility: Include ARIA labels, proper heading hierarchy.
        Component type: \${componentType}\`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: description }
                ]
            })
        });
        const data = await response.json();
        return this.validateOutput(data.choices[0].message.content);
    }

    validateOutput(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const issues = [];
        doc.querySelectorAll('img:not([alt])').forEach(() =&gt; issues.push('Image missing alt text'));
        doc.querySelectorAll('button:not([aria-label])').forEach(btn =&gt; {
            if (!btn.textContent.trim()) issues.push('Button missing accessible name');
        });
        return { html, issues, valid: issues.length === 0 };
    }
}&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Step-by-Step: Infinite Scroll Component Gallery from AI Designs</h2>

<h3>Step 1: Create the Generator Pipeline</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;const generator = new UIGenerator(API_KEY, {
    colors: { primary: '#adff85', background: '#0c1517', surface: '#2d3638' },
    spacing: { unit: '0.25rem', scale: [0,1,2,3,4,6,8,12,16] },
    borderRadius: { default: '0.5rem', large: '1rem' }
});

const componentPrompts = [
    { desc: 'Dashboard stat card with icon, value, and trend indicator', type: 'card' },
    { desc: 'User profile card with avatar, name, role, and action buttons', type: 'card' },
    { desc: 'Pricing card with feature list, price, and CTA button', type: 'card' },
    { desc: 'Blog post preview with thumbnail, title, excerpt, and metadata', type: 'card' },
    { desc: 'Notification item with icon, message, timestamp, and dismiss', type: 'list-item' },
    { desc: 'Search result item with title, URL breadcrumb, and description', type: 'list-item' },
    { desc: 'Contact form with name, email, phone, message, and submit', type: 'form' },
    { desc: 'Login form with email, password, remember me, and social login', type: 'form' }
];&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h3>Step 2: Build the Scrollable Gallery</h3>
<pre><code>&lt;pre&gt;&lt;code&gt;class ComponentGallery {
    constructor(container) {
        this.container = container;
        this.components = [];
        this.index = 0;
        this.loading = false;
    }

    async loadBatch(size = 2) {
        if (this.loading || this.index &gt;= componentPrompts.length) return;
        this.loading = true;
        const batch = componentPrompts.slice(this.index, this.index + size);
        for (const prompt of batch) {
            const result = await generator.generateComponent(prompt.desc, prompt.type);
            this.components.push(result);
            this.renderItem(result, prompt);
        }
        this.index += size;
        this.loading = false;
    }

    renderItem(result, prompt) {
        const card = document.createElement('div');
        card.className = 'component-card';
        card.innerHTML = \`
            &lt;div class="component-header"&gt;
                &lt;span class="component-type"&gt;\${prompt.type}&lt;/span&gt;
                &lt;span class="component-status \${result.valid ? 'valid' : 'issues'}"&gt;
                    \${result.valid ? 'Accessible' : result.issues.length + ' issues'}
                &lt;/span&gt;
            &lt;/div&gt;
            &lt;p class="component-desc"&gt;\${prompt.desc}&lt;/p&gt;
            &lt;div class="component-preview"&gt;\${result.html}&lt;/div&gt;
            \${result.issues.length ? '&lt;ul class="issues-list"&gt;' + result.issues.map(i =&gt; '&lt;li&gt;' + i + '&lt;/li&gt;').join('') + '&lt;/ul&gt;' : ''}
        \`;
        this.container.appendChild(card);
    }

    setupScroll() {
        this.container.addEventListener('scroll', () =&gt; {
            const { scrollTop, scrollHeight, clientHeight } = this.container;
            if (scrollHeight - scrollTop - clientHeight &lt; 400) {
                this.loadBatch();
            }
        });
    }
}

const gallery = new ComponentGallery(document.getElementById('gallery'));
gallery.setupScroll();
gallery.loadBatch();&lt;/code&gt;&lt;/pre&gt;</code></pre>

<h2>Conclusion</h2>
<p>Generative AI UI design is most valuable when integrated into a structured pipeline with validation and human review. The prompt-to-component workflow demonstrated here produces production-quality output by embedding design system constraints directly in prompts and validating accessibility automatically. The infinite scroll gallery pattern allows designers and developers to explore AI-generated components efficiently, selecting and refining the best candidates for production use.</p>`
  }
];

export default blogPosts1;
