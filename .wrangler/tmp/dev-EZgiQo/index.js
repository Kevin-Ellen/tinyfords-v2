(() => {
  // .wrangler/tmp/bundle-TsDCq2/checked-fetch.js
  var urls = /* @__PURE__ */ new Set();
  function checkURL(request, init2) {
    const url2 = request instanceof URL ? request : new URL(
      (typeof request === "string" ? new Request(request, init2) : request).url
    );
    if (url2.port && url2.port !== "443" && url2.protocol === "https:") {
      if (!urls.has(url2.toString())) {
        urls.add(url2.toString());
        console.warn(
          `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url2.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
        );
      }
    }
  }
  globalThis.fetch = new Proxy(globalThis.fetch, {
    apply(target, thisArg, argArray) {
      const [request, init2] = argArray;
      checkURL(request, init2);
      return Reflect.apply(target, thisArg, argArray);
    }
  });

  // ../../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/common.ts
  var __facade_middleware__ = [];
  function __facade_register__(...args) {
    __facade_middleware__.push(...args.flat());
  }
  function __facade_registerInternal__(...args) {
    __facade_middleware__.unshift(...args.flat());
  }
  function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
    const [head, ...tail] = middlewareChain;
    const middlewareCtx = {
      dispatch,
      next(newRequest, newEnv) {
        return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
      }
    };
    return head(request, env, ctx, middlewareCtx);
  }
  function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
    return __facade_invokeChain__(request, env, ctx, dispatch, [
      ...__facade_middleware__,
      finalMiddleware
    ]);
  }

  // ../../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/loader-sw.ts
  var __FACADE_EVENT_TARGET__;
  if (globalThis.MINIFLARE) {
    __FACADE_EVENT_TARGET__ = new (Object.getPrototypeOf(WorkerGlobalScope))();
  } else {
    __FACADE_EVENT_TARGET__ = new EventTarget();
  }
  function __facade_isSpecialEvent__(type) {
    return type === "fetch" || type === "scheduled";
  }
  var __facade__originalAddEventListener__ = globalThis.addEventListener;
  var __facade__originalRemoveEventListener__ = globalThis.removeEventListener;
  var __facade__originalDispatchEvent__ = globalThis.dispatchEvent;
  globalThis.addEventListener = function(type, listener, options) {
    if (__facade_isSpecialEvent__(type)) {
      __FACADE_EVENT_TARGET__.addEventListener(
        type,
        listener,
        options
      );
    } else {
      __facade__originalAddEventListener__(type, listener, options);
    }
  };
  globalThis.removeEventListener = function(type, listener, options) {
    if (__facade_isSpecialEvent__(type)) {
      __FACADE_EVENT_TARGET__.removeEventListener(
        type,
        listener,
        options
      );
    } else {
      __facade__originalRemoveEventListener__(type, listener, options);
    }
  };
  globalThis.dispatchEvent = function(event) {
    if (__facade_isSpecialEvent__(event.type)) {
      return __FACADE_EVENT_TARGET__.dispatchEvent(event);
    } else {
      return __facade__originalDispatchEvent__(event);
    }
  };
  globalThis.addMiddleware = __facade_register__;
  globalThis.addMiddlewareInternal = __facade_registerInternal__;
  var __facade_waitUntil__ = Symbol("__facade_waitUntil__");
  var __facade_response__ = Symbol("__facade_response__");
  var __facade_dispatched__ = Symbol("__facade_dispatched__");
  var __Facade_ExtendableEvent__ = class extends Event {
    [__facade_waitUntil__] = [];
    waitUntil(promise) {
      if (!(this instanceof __Facade_ExtendableEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this[__facade_waitUntil__].push(promise);
    }
  };
  var __Facade_FetchEvent__ = class extends __Facade_ExtendableEvent__ {
    #request;
    #passThroughOnException;
    [__facade_response__];
    [__facade_dispatched__] = false;
    constructor(type, init2) {
      super(type);
      this.#request = init2.request;
      this.#passThroughOnException = init2.passThroughOnException;
    }
    get request() {
      return this.#request;
    }
    respondWith(response2) {
      if (!(this instanceof __Facade_FetchEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      if (this[__facade_response__] !== void 0) {
        throw new DOMException(
          "FetchEvent.respondWith() has already been called; it can only be called once.",
          "InvalidStateError"
        );
      }
      if (this[__facade_dispatched__]) {
        throw new DOMException(
          "Too late to call FetchEvent.respondWith(). It must be called synchronously in the event handler.",
          "InvalidStateError"
        );
      }
      this.stopImmediatePropagation();
      this[__facade_response__] = response2;
    }
    passThroughOnException() {
      if (!(this instanceof __Facade_FetchEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this.#passThroughOnException();
    }
  };
  var __Facade_ScheduledEvent__ = class extends __Facade_ExtendableEvent__ {
    #scheduledTime;
    #cron;
    #noRetry;
    constructor(type, init2) {
      super(type);
      this.#scheduledTime = init2.scheduledTime;
      this.#cron = init2.cron;
      this.#noRetry = init2.noRetry;
    }
    get scheduledTime() {
      return this.#scheduledTime;
    }
    get cron() {
      return this.#cron;
    }
    noRetry() {
      if (!(this instanceof __Facade_ScheduledEvent__)) {
        throw new TypeError("Illegal invocation");
      }
      this.#noRetry();
    }
  };
  __facade__originalAddEventListener__("fetch", (event) => {
    const ctx = {
      waitUntil: event.waitUntil.bind(event),
      passThroughOnException: event.passThroughOnException.bind(event)
    };
    const __facade_sw_dispatch__ = function(type, init2) {
      if (type === "scheduled") {
        const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
          scheduledTime: Date.now(),
          cron: init2.cron ?? "",
          noRetry() {
          }
        });
        __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
        event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      }
    };
    const __facade_sw_fetch__ = function(request, _env, ctx2) {
      const facadeEvent = new __Facade_FetchEvent__("fetch", {
        request,
        passThroughOnException: ctx2.passThroughOnException
      });
      __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
      facadeEvent[__facade_dispatched__] = true;
      event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
      const response2 = facadeEvent[__facade_response__];
      if (response2 === void 0) {
        throw new Error("No response!");
      }
      return response2;
    };
    event.respondWith(
      __facade_invoke__(
        event.request,
        globalThis,
        ctx,
        __facade_sw_dispatch__,
        __facade_sw_fetch__
      )
    );
  });
  __facade__originalAddEventListener__("scheduled", (event) => {
    const facadeEvent = new __Facade_ScheduledEvent__("scheduled", {
      scheduledTime: event.scheduledTime,
      cron: event.cron,
      noRetry: event.noRetry.bind(event)
    });
    __FACADE_EVENT_TARGET__.dispatchEvent(facadeEvent);
    event.waitUntil(Promise.all(facadeEvent[__facade_waitUntil__]));
  });

  // ../../../../../../usr/local/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
  function reduceError(e) {
    return {
      name: e?.name,
      message: e?.message ?? String(e),
      stack: e?.stack,
      cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
    };
  }
  var jsonError = async (request, env, _ctx, middlewareCtx) => {
    try {
      return await middlewareCtx.next(request, env);
    } catch (e) {
      const error = reduceError(e);
      return Response.json(error, {
        status: 500,
        headers: { "MF-Experimental-Error-Stack": "true" }
      });
    }
  };
  var middleware_miniflare3_json_error_default = jsonError;

  // .wrangler/tmp/bundle-TsDCq2/middleware-insertion-facade.js
  __facade_registerInternal__([middleware_miniflare3_json_error_default]);

  // wrangler-module-Text:./85008cc904f6dc5e036b86886e0d4798dbb8ea85-stylesAdmin.css
  var cc904f6dc5e036b86886e0d4798dbb8ea85_stylesAdmin_default = __85008cc904f6dc5e036b86886e0d4798dbb8ea85_stylesAdmin_css;

  // src/admin/lib/construction/documentHead.js
  var documentHead = () => {
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <link rel="preload" href="/fonts/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xQIXFB7xG-GNxkg.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="/fonts/montserratalternates/v17/mFTiWacfw6zH4dthXcyms1lPpC8I_b0juU0xNIPFB7xG-GNxkg.woff2" as="font" type="font/woff2" crossorigin>
        <link rel="preload" href="/fonts/quicksand/v30/6xKtdSZaM9iE8KbpRA_hK1QNYuDyPw.woff2" as="font" type="font/woff2" crossorigin>
        <style>
          ${cc904f6dc5e036b86886e0d4798dbb8ea85_stylesAdmin_default}
        </style>
        <title>Tiny Fords - Admin panel</title>
        <meta name="theme-color" content="#005490">
      </head>
      <body>`;
    return html;
  };
  var documentHead_default = documentHead;

  // src/admin/lib/construction/documentEnd.js
  var documentEnd = () => {
    const html = `
  </body>
  </html>`;
    return html;
  };
  var documentEnd_default = documentEnd;

  // src/admin/lib/fragments/formAdminLogin.js
  var fragmentFormAdminLogin = () => {
    const html = `
    <section class="fragmentContent adminCenter">
      <h1>Login</h1>
      <div class="formContainer">
        <form action="/admin" method="post" class="adminForm">
          <div class="inputGroup">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
          </div>

          <div class="inputGroup">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  `;
    return html;
  };
  var formAdminLogin_default = fragmentFormAdminLogin;

  // src/admin/lib/utils/misc.js
  var isLoggedIn = (request) => {
    const cookieString = request.headers.get("Cookie");
    return cookieString && cookieString.includes("admin-authenticated=true");
  };
  var quickLogin = (request) => {
    if (isLoggedIn(request)) {
      return false;
    }
    return [
      "<main>",
      formAdminLogin_default(),
      "</main>"
    ].join("");
  };
  var getLastCarId = (data) => {
    return Math.max(...data.map((car) => car.id)) + 1;
  };
  var duplicateChecker = (dataArray, keys, values) => {
    for (let key of keys) {
      if (key === "code" && values[key] === null) {
        continue;
      }
      if (dataArray.some((item) => item[key] === values[key] && item.id !== values.id)) {
        return {
          success: false,
          message: `Duplicate found for <em>${key}</em> with value <em>${values[key]}</em>.`
        };
      }
    }
    return {
      success: true,
      message: "No duplicates found."
    };
  };
  var generateOptions = (items, selectedValue, valueProp = "id", nameProp = "name") => {
    return items.map((item) => `
    <option value="${item[valueProp]}" ${item[valueProp] === selectedValue ? "selected" : ""}>
      ${item[nameProp]}
    </option>
  `).join("");
  };

  // src/admin/lib/construction/pageHead.js
  var pageHead = (request, options) => {
    const links = generateLinks(request, options);
    const html = `
    <header class="siteHeader">
      <div class="siteHeaderContainer">
        <label class="siteNavLabel" for="siteNavBox">
          <svg viewBox="0 0 100 80" width="25" height="25">
            <rect width="100" height="20" rx="10"></rect>
            <rect y="30" width="100" height="20" rx="10"></rect>
            <rect y="60" width="100" height="20" rx="10"></rect>
          </svg>
          <span class="a11y">Open main menu</span>
        </label>

        <p class="siteNavName"><a href="/">Tiny Fords</a></p>

        <input type="checkbox" class="siteNavBox" id="siteNavBox">
        <nav class="siteNavMenu" aria-label="Main menu">
          <ul class="mainMenu">
            ${links}
          </ul>
        </nav>
      </div>
    </header>`;
    return html;
  };
  var pageHead_default = pageHead;
  var generateLinks = (request, options = {}) => {
    const loggedIn = isLoggedIn(request) || options.isAuthenticated;
    if (!loggedIn) {
      return `<li><a href="/">Back to public home</a></li>`;
    } else {
      return [
        { name: "Admin home", slug: "/admin" },
        { name: "Add car", slug: "/admin/add-car" },
        { name: "Search car", slug: "/admin/search-car" },
        { name: "Log out", slug: "/admin/logout" }
      ].map((page) => `<li><a href="${page.slug}">${page.name}</a></li>`).join("");
    }
  };

  // src/admin/lib/construction/pageBreadcrumbs.js
  var pageBreadcrumbs = () => {
    const html = `
  <nav class="breadcrumbsContainer" aria-label="breadcrumb">
    <ul class="breadcrumbs">
      <li><a href="/">Public home</a></li>
      <li aria-hidden="true">/</li>
      <li><a href="/admin">Admin home</a></li>
    </ul>
  </nav>`;
    return html;
  };
  var pageBreadcrumbs_default = pageBreadcrumbs;

  // src/admin/lib/construction/pageFooter.js
  var pageFooter = () => {
    const html = `
    <footer class="siteFooter">
      <h2>Thanks for visiting Tiny Fords</h2>
      <p>Here at Tiny Fords, we're passionate about Ford die-cast cars, and we're thrilled to share our collection with you. This non-commercial site is a labor of love, created by Kevin Ellen to keep track of his collection and avoid buying duplicates. We're proud to say it was made in 2023, using a Cloudflare Worker on a free account. We hope you've enjoyed exploring our collection and we look forward to your next visit! Don't forget to check out the contact page if you have any question or feedback. Thank you for choosing Tiny Fords.</p>
    </footer>`;
    return html;
  };
  var pageFooter_default = pageFooter;

  // src/admin/lib/fragments/content.js
  var fragmentContent = (content3) => {
    const html = `<section class="fragmentContent">
    ${content3}
  </section>`;
    return html;
  };
  var content_default = fragmentContent;

  // src/admin/lib/templates/home.js
  var templateAdminHome = (request, options) => {
    const content3 = [
      `<h1>Admin panel</h1>`,
      `<p>Admin functions to add and edit cars.</p>`,
      `<ul>`,
      `<li><a href="/admin/add-car">Add car</a></li>`,
      `<li><a href="/admin/edit-car">Edit car</a></li>`,
      `</ul>`
    ].join("");
    const sections = [
      content_default(content3)
    ].join("");
    return options.isAuthenticated ? sections : quickLogin(request) || sections;
  };
  var home_default = templateAdminHome;

  // src/lib/utils/misc.js
  var base64Decode = (str) => {
    return decodeURIComponent(
      atob(str).split("").map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join("")
    );
  };
  var getValueByPath = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };
  var multiSort = (data, fields, directions) => {
    return data.sort((a, b) => {
      for (const field of fields) {
        const valueA = getValueByPath(a, field);
        const valueB = getValueByPath(b, field);
        let comparison;
        if (valueA && valueB && Date.parse(valueA) && Date.parse(valueB)) {
          comparison = new Date(valueB) - new Date(valueA);
        } else {
          comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        }
        if (directions[field] === "asc") {
          comparison *= -1;
        }
        if (comparison !== 0)
          return comparison;
      }
      return 0;
    });
  };

  // src/lib/services/github.js
  var apiKey = GITHUB_API_KEY;
  var REPO_OWNER = "Kevin-Ellen";
  var REPO_NAME = "tinyfords-v2";
  var BASE_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/`;
  var FILE_PATH = {
    allPages: "src/data/pages.json",
    allCars: "src/data/cars.json"
  };
  var fetchFromGitHub = async (path) => {
    const url2 = BASE_URL + path;
    const response2 = await fetch(url2, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "User-Agent": "tinyfords-v2-app",
        "Accept": "application/json"
      }
    });
    if (!response2.ok) {
      console.log("Headers:");
      for (let [key, value] of response2.headers.entries()) {
        console.log(`${key}: ${value}`);
      }
      response2.text().then((text) => {
        console.log("Response body:", text);
      });
      throw new Error(`GitHub API returned ${response2.status}: ${response2.statusText}`);
    }
    const data = await response2.json();
    const decoded = base64Decode(data.content);
    return JSON.parse(decoded);
  };
  var servicesGithubDataPageAll = async () => {
    return fetchFromGitHub(FILE_PATH.allPages);
  };
  var servicesGithubDataCarsAll = async () => {
    return fetchFromGitHub(FILE_PATH.allCars);
  };
  var servicesGithubImageGetter = async (path) => {
    const response2 = await fetch(BASE_URL + path, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "User-Agent": "tinyfords-v2-app",
        "Accept": "application/vnd.github.3.raw"
      }
    });
    if (!response2.ok) {
      throw new Error("Image not found on Github");
    }
    const eTag = response2.headers.get("etag");
    const blob = await response2.blob();
    return {
      headers: { etag: eTag },
      data: blob
    };
  };

  // src/lib/services/init.js
  var ITEMS_PER_PAGE = {
    homepage: 14,
    collection: 21
  };

  // src/lib/utils/dataPages.js
  var getPageBySlug = (slug, data = appData.pages.all) => {
    return data.find((page) => page.slug === slug) || false;
  };

  // src/lib/services/appData.js
  var appData = {
    pages: {
      all: [],
      current: {}
    },
    cars: {
      all: [],
      current: [],
      overview: {
        ot: 0,
        hw: 0,
        mb: 0,
        all: 0
      }
    },
    search: {
      searchTerm: null,
      success: false,
      action: null
    },
    options: {
      noindex: null
    },
    breadcrumbs: [],
    pagination: {
      page: null,
      start: null,
      end: null,
      total: null,
      slug: null,
      previous: {
        has: null,
        page: null
      },
      next: {
        has: null,
        page: null
      }
    }
  };
  var apiAppData = async () => {
    try {
      appData.cars.all = await servicesGithubDataCarsAll();
      appData.pages.all = await servicesGithubDataPageAll();
    } catch (error) {
      console.error("Error initializing appData: ", error);
    }
  };
  var initAppData = async (url2) => {
    try {
      appData.pages.all = await servicesGithubDataPageAll();
      const allCars = await servicesGithubDataCarsAll();
      appData.cars.all = utilDataCarsLatest(allCars);
      setCurrentPage(url2);
      setBreadcrumbs();
      setNoindex();
      setCurrentCanonical();
      setCarsOverview();
      if (appData.pages.current.url.searchParams.get("q")) {
        appData.search.searchTerm = appData.pages.current.url.searchParams.get("q");
        appData.search.action = "search";
        appData.search.success = true;
      }
      if (appData.pages.current.hasCars) {
        setCurrentCars(appData.pages.current.id);
        if (appData.search.action === "search" && appData.search.success) {
          appData.cars.current = searchCars(appData.search.searchTerm);
        }
      }
      if (appData.pages.current.template === "collection") {
        setPagination(appData.pages.current.url.searchParams.get("page"));
      }
      if (appData.pages.current.template === "home") {
        appData.cars.current = utilDataCarsLatest(allCars, ITEMS_PER_PAGE.homepage);
      }
    } catch (error) {
      console.error("Error initializing appData: ", error);
    }
  };
  var setCurrentPage = (url2) => {
    try {
      appData.pages.current = getPageBySlug(url2.pathname);
      appData.pages.current.url = url2;
      return true;
    } catch (error) {
      console.log("[Error] request.js: setCurrentPage", error);
      return false;
    }
  };
  var setCurrentCanonical = () => {
    const { pages: { current } } = appData;
    appData.pages.current.canonical = false;
    if (current.status === 200 && current.template !== "offline") {
      appData.pages.current.canonical = `${current.url.protocol}//${current.url.host}${current.slug}`;
      if (current.template === "collection" && current.url.searchParams.get("page") && current.url.searchParams.get("page") != 1) {
        appData.pages.current.canonical += `?page=${current.url.searchParams.get("page")}`;
      }
    }
  };
  var setCurrentCars = (id) => {
    try {
      appData.cars.current = id === "home" || id === "all" ? appData.cars.all : getCarsByCategoryId(id);
      return true;
    } catch (error) {
      console.log("[Error] request.js: setCurrentCars", error);
      return false;
    }
  };
  var setPagination = (pageNumber = 1) => {
    const carsCount = appData.cars.current.length;
    pageNumber = parseInt(pageNumber);
    appData.pagination.page = pageNumber;
    appData.pagination.start = (pageNumber - 1) * ITEMS_PER_PAGE.collection;
    appData.pagination.end = appData.pagination.start + ITEMS_PER_PAGE.collection;
    appData.pagination.total = Math.ceil(carsCount / ITEMS_PER_PAGE.collection);
    appData.pagination.slug = appData.pages.current.url.pathname;
    appData.pagination.previous.has = pageNumber > 1;
    appData.pagination.previous.page = pageNumber > 1 ? pageNumber - 1 : null;
    appData.pagination.next.has = appData.pagination.end < carsCount;
    appData.pagination.next.page = appData.pagination.end < carsCount ? pageNumber + 1 : null;
  };
  var setBreadcrumbs = (data = appData.pages.all) => {
    appData.breadcrumbs = appData.pages.current.breadcrumbList.map((breadcrumbName, index) => {
      const breadcrumbPage = data.find((page) => page.name === breadcrumbName);
      if (breadcrumbPage) {
        return {
          name: breadcrumbName,
          slug: breadcrumbPage.slug,
          position: index + 1
        };
      } else {
        return null;
      }
    }).filter((item) => item);
  };
  var setNoindex = (data = appData.pages.current) => {
    appData.options.noindex = false;
    if (data.visibility.robots.noindex) {
      appData.options.noindex = true;
      return true;
    }
    for (const [key, value] of data.url.searchParams.entries()) {
      if (key !== "page" || isNaN(value) || parseInt(value, 10) != value) {
        appData.options.noindex = true;
        return true;
      }
    }
    return false;
  };
  var setCarsOverview = () => {
    appData.cars.overview.hw = 0;
    appData.cars.overview.mb = 0;
    appData.cars.overview.ot = 0;
    appData.cars.all.forEach((car) => {
      appData.cars.overview[car.categoryDetails.id]++;
    });
    appData.cars.overview.all = appData.cars.overview.hw + appData.cars.overview.mb + appData.cars.overview.ot;
  };

  // src/lib/utils/dataCars.js
  var utilDataCarsLatest = (data, number) => {
    const sortedCars = multiSort(data, ["addedDetails.date", "id"], { "addedDetails.date": "desc", id: "desc" });
    return sortedCars.slice(0, number);
  };
  var getUniqueCarCategories = (data) => {
    const uniqueCategoriesMap = data.reduce((acc, car) => {
      const { id, name, folder } = car.categoryDetails;
      if (!acc[id]) {
        acc[id] = { id, name, folder };
      }
      return acc;
    }, {});
    return Object.values(uniqueCategoriesMap);
  };
  var getUniqueCarCaseTypes = (data) => {
    const uniqueCarCaseTypeMap = data.reduce((acc, car) => {
      const { id, name } = car.caseDetails;
      if (!acc[id]) {
        acc[id] = { id, name };
      }
      return acc;
    }, {});
    return Object.values(uniqueCarCaseTypeMap);
  };
  var getCaseById = (dataCarsAll, caseId) => {
    if (caseId === void 0 || caseId === false) {
      return false;
    }
    const foundItem = dataCarsAll.find((item) => item.caseDetails.id === caseId);
    return foundItem ? foundItem.caseDetails : false;
  };
  var getCategoryById = (dataCarsAll, categoryId) => {
    if (categoryId === void 0) {
      return false;
    }
    return dataCarsAll.find((item) => item.categoryDetails.id === categoryId).categoryDetails;
  };
  var getCarById = (id, cars = appData.cars.all) => {
    return cars.find((car) => car.id === parseInt(id, 10));
  };
  var getCarsByCategoryId = (id, cars = appData.cars.all) => {
    return cars.filter((car) => car.categoryDetails.id === id);
  };
  var searchCars = (term, data = appData.cars.current) => {
    if (!term)
      return data;
    term = term.toLowerCase();
    return data.filter((car) => {
      return car.name && car.name.toLowerCase().includes(term) || // Check if name exists and includes the term
      car.brand && car.brand.toLowerCase().includes(term) || // Check if brand exists and includes the term
      car.code && car.code.toLowerCase().includes(term) || // Check if code exists and includes the term
      car.make && car.make.toLowerCase().includes(term);
    });
  };

  // src/lib/utils/carConstruct.js
  var utilCarConstruct = (dataCarsAll = [], data = {}) => {
    const processedData = processFormData(data);
    const newCar = {
      ...templateCar,
      ...processedData,
      hasPhoto: processBooleanField(processedData.hasPhoto),
      caseDetails: {
        ...templateCar.caseDetails,
        ...getCaseById(dataCarsAll, processedData.caseType),
        status: processBooleanField(processedData.hasCase)
      },
      categoryDetails: getCategoryById(dataCarsAll, processedData.category) || templateCar.categoryDetails
    };
    switch (newCar.categoryDetails.id) {
      case "hw":
      case "mb":
        newCar.brand = newCar.categoryDetails.name;
        break;
      default:
        break;
    }
    delete newCar.hasCase;
    delete newCar.caseType;
    delete newCar.category;
    delete newCar.action;
    return newCar;
  };
  var carConstruct_default = utilCarConstruct;
  var templateCar = {
    id: null,
    name: "",
    make: "",
    brand: "",
    categoryDetails: {
      id: "",
      name: "",
      folder: ""
    },
    code: null,
    base: null,
    caseDetails: {
      id: "",
      name: "",
      status: null
    },
    quantity: 0,
    addedDetails: {
      date: null,
      by: ""
    },
    hasPhoto: false
  };
  var processFormData = (formData) => {
    const processedData = { ...formData };
    const nullKeys = ["code", "hasCase", "base"];
    nullKeys.forEach((key) => {
      if (processedData.hasOwnProperty(key) && processedData[key] === "null") {
        processedData[key] = null;
      }
    });
    processedData.id = parseInt(processedData.id, 10);
    processedData.quantity = parseInt(processedData.quantity, 10);
    processedData.hasPhoto = processHasPhoto(processedData.hasPhoto);
    return processedData;
  };
  var processHasPhoto = (value) => {
    if (value === "on")
      return true;
    if (value === true)
      return true;
    if (value === false)
      return false;
    return false;
  };
  var processBooleanField = (value) => {
    if (["on", "true"].includes(value))
      return true;
    if (value === "false")
      return false;
    if (value === "null")
      return null;
    return value;
  };

  // src/admin/lib/fragments/formCarAdd.js
  var fragmentFormCarAdd = async (options = {}) => {
    const dataCarsAll = await servicesGithubDataCarsAll();
    const dataCar = !options.feedback || options.feedback.success ? carConstruct_default({}, dataCarsAll) : options.data;
    const categories = generateOptions2(getUniqueCarCategories(dataCarsAll), dataCar.categoryDetails.id);
    const cases = generateOptions2(getUniqueCarCaseTypes(dataCarsAll), dataCar.caseDetails.id);
    const html = `
    <!-- Add Car Form Section -->
    <section class="fragmentContent adminCenter">
      <h2>Add car form</h2>
      <div class="formContainer">
        <!-- Actual Form Begins -->
        <form action="/admin/add-car" method="post" class="adminForm">
          <input type="hidden" name="id" id="id" value="${getLastCarId(dataCarsAll)}">

          <div class="inputGroup">
            <label for="code">Code:</label>
            <input type="text" 
              id="code" 
              name="code" 
              value="${dataCar.code && duplicateChecker(dataCarsAll, "code", dataCar.code).success ? dataCar.code : ""}" 
              required>
            ${dataCar.code ? !duplicateChecker(dataCarsAll, "code", dataCar.code).success ? `<p>Previously provided code already exists</p>` : "" : ""}
          </div>

          <div class="inputGroup">
            <label for="base">Base:</label>
            <input type="text" id="base" name="base" value="${dataCar.base || ""}" required>
          </div>

          <div class="inputGroup">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" value="${dataCar.name || ""}" required>
          </div>

          <div class="inputGroup">
            <label for="make">Make:</label>
            <input type="text" id="make" name="make" value="${dataCar.make || ""}" required>
          </div>

          <div class="inputGroup">
            <label for="category">Category:</label>
            <select id="category" name="category" required>
              <option value="" selected disabled>Select a category</option>
              ${categories}
            </select>
          </div>

          <div class="inputGroup">
            <label for="brand">Brand:</label>
            <input type="text" id="brand" name="brand" value="${dataCar.brand || ""}">
          </div>

          <div class="inputGroup">
            <label for="hasPhoto">Photo is online:</label>
            <input type="checkbox" id="hasPhoto" name="hasPhoto" ${dataCar.hasPhoto ? "checked" : ""}>
          </div>

          <fieldset class="inputGroup">
            <legend>Case Details</legend>
          
            <label for="caseType">Case Type:</label>
            <select id="caseType" name="caseType" required>
              <option value="" selected disabled>Select a type</option>
              ${cases}
            </select>
            
            <div class="radioGroup">
              <label>Has Case:</label>
              
              <div class="radioEntry">
                <label for="yes">Yes</label>
                <input type="radio" id="yes" name="hasCase" value="true" ${dataCar.caseDetails.status === true ? "checked" : ""}>
              </div>

              <div class="radioEntry">
                <label for="no">No</label>
                <input type="radio" id="no" name="hasCase" value="false" ${dataCar.caseDetails.status === false || dataCar.caseDetails.status === void 0 ? "checked" : ""}>
              </div>
              
              <div class="radioEntry">
                <label for="na">N/A</label>
                <input type="radio" id="na" name="hasCase" value="null" ${dataCar.caseDetails.status === null ? "checked" : ""}>
              </div>
            </div>
          </fieldset>

          <div class="inputGroup">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" min="1" value="${dataCar.quantity > 0 ? dataCar.quantity : 1}">
          </div>

          <button type="submit">Add car</button>
        </form>
      </div>
    </section>`;
    return html;
  };
  var formCarAdd_default = fragmentFormCarAdd;
  var generateOptions2 = (items, selectedValue, valueProp = "id", nameProp = "name") => {
    return items.map((item) => `
    <option value="${item[valueProp]}" ${item[valueProp] === selectedValue ? "selected" : ""}>
      ${item[nameProp]}
    </option>
  `).join("");
  };

  // src/admin/lib/templates/carAdd.js
  var templateAdminCarAdd = async (request, options = {}) => {
    const contentTop = [
      `<h1>Add car</h1>`
    ];
    const contentFeedback = [
      options.feedback ? content_default(addedDetail(options)) : null
    ].join("");
    const sections = [
      content_default(contentTop),
      contentFeedback || null,
      await formCarAdd_default(options)
    ].join("");
    return quickLogin(request) || sections;
  };
  var carAdd_default = templateAdminCarAdd;
  var addedDetail = (options) => {
    const sections = [
      `<h2>${options.feedback.message}</h2>`,
      createCarDetails(options.data)
    ].join("");
    return sections;
  };
  var createCarDetails = (data) => {
    const html = `<h3>Car details</h3>
  <div class="carCard">
    <ul class="carDetails">
      <li><strong>ID:</strong> ${data.id}</li>
      <li><strong>Code:</strong> ${data.code}</li>
      <li><strong>Base:</strong> ${data.base}</li>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Make:</strong> ${data.make}</li>
      <li><strong>Brand:</strong> ${data.brand}</li>
      <li><strong>Category:</strong> ${data.categoryDetails.name}</li>
      <li><strong>Case type:</strong> ${data.caseDetails.name}</li>
      <li><strong>In case:</strong> ${data.caseDetails.status === null ? "n/a" : data.caseDetails.status ? "Yes" : "No"}</li>
      <li><strong>Has photo:</strong> ${data.hasPhoto ? "Yes" : "No"}</li>
      <li><strong>Quantity:</strong> ${data.quantity}</li>
    </ul>
  </div>`;
    return html;
  };

  // src/admin/lib/fragments/formCarSearch.js
  var fragmentFormCarSearch = async (options = {}) => {
    const dataCarsAll = await servicesGithubDataCarsAll();
    const categories = generateOptions(getUniqueCarCategories(dataCarsAll));
    const cases = generateOptions(getUniqueCarCaseTypes(dataCarsAll));
    const html = `
    <!-- Car Search Form Section -->
    <section class="fragmentContent adminCenter">
      <h2>Car search form</h2>
      <div class="formContainer">
        <!-- Actual Form Begins -->
        <form action="/admin/search-car" method="post" class="adminForm">
          <div class="inputGroup">
            <label for="id">ID:</label>
            <input type="number" min="0" id="id" name="id">
          </div>
          <div class="inputGroup">
            <label for="code">Code:</label>
            <input type="text" id="code" name="base">
          </div>
          <div class="inputGroup">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
          </div>
          <div class="inputGroup">
            <label for="make">Make:</label>
            <input type="text" id="make" name="make">
          </div>
          <div class="inputGroup">
            <label for="category">Category:</label>
            <select id="category" name="category">
              <option value="" selected>Select a category</option>
              ${categories}
            </select>
          </div>
          <div class="inputGroup">
            <label for="brand">Brand:</label>
            <input type="text" id="brand" name="brand">
          </div>
          <fieldset class="inputGroup">
            <label>Photo is online:</label>
            <div class="radioGroup">
              <div class="radioEntry">
                <label for="hasPhoto-yes">Yes</label>
                <input type="radio" id="hasPhoto-yes" name="hasPhoto" value="true">
              </div>

              <div class="radioEntry">
                <label for="hasPhoto-no">No</label>
                <input type="radio" id="hasPhoto-no" name="hasPhoto" value="false">
              </div>
            </div>
          </fieldset>
          <fieldset class="inputGroup">
            <legend>Case Details</legend>
          
            <label for="caseType">Case Type:</label>
            <select id="caseType" name="caseType">
              <option value="" selected>Select a type</option>
              ${cases}
            </select>
            
            <div class="radioGroup">
              <label>Has Case:</label>
              
              <div class="radioEntry">
                <label for="hasCase-yes">Yes</label>
                <input type="radio" id="hasCase-yes" name="hasCase" value="true">
              </div>

              <div class="radioEntry">
                <label for="hasCase-no">No</label>
                <input type="radio" id="hasCase-no" name="hasCase" value="false">
              </div>
              
              <div class="radioEntry">
                <label for="hasCase-na">N/A</label>
                <input type="radio" id="hasCase-na" name="hasCase" value="null">
              </div>
            </div>
          </fieldset>
          <button type="reset">Reset form</button>
          <button type="submit">Search car</button>
        </form>
      </div>
    </section>`;
    return html;
  };
  var formCarSearch_default = fragmentFormCarSearch;

  // src/admin/lib/templates/carSearch.js
  var templateAdminCarSearch = async (request, options = {}) => {
    const contentTop = [
      `<h1>Search car</h1>`
    ];
    const contentFeedback = [
      options.feedback ? content_default(addedDetail2(options)) : null
    ].join("");
    const sections = [
      content_default(contentTop),
      contentFeedback || null,
      await formCarSearch_default(options)
    ].join("");
    return options.isAuthenticated ? sections : quickLogin(request) || sections;
  };
  var carSearch_default = templateAdminCarSearch;
  var addedDetail2 = (options) => {
    const sections = [
      `<h2>${options.feedback.message}</h2>`,
      createTable(options.data)
    ].join("");
    return sections;
  };
  var createTable = (data) => {
    const svg = {
      true: generateSVG("true"),
      false: generateSVG("false"),
      null: generateSVG("null")
    };
    const rows = data.map((car) => `
  <tr>
    <td><input type="radio" name="carId" id="car${car.id}" value="${car.id}"></td>
    <td><label for="car${car.id}">${car.id}</label></td>
    <td><label for="car${car.id}">${car.name}</label></td>
    <td><label for="car${car.id}">${car.make}</label></td>
    <td><label for="car${car.id}">${car.code}</label></td>
    <td><label for="car${car.id}">${car.base}</label></td>
    <td><label for="car${car.id}">${car.categoryDetails.name}</label></td>
    <td><label for="car${car.id}">${car.brand}</label></td>
    <td><label for="car${car.id}">${car.caseDetails.name}</label></td>
    <td>
      <label for="car${car.id}">
        ${car.caseDetails.status === true ? svg.true : car.caseDetails.status === false ? svg.false : svg.null}
        </label>
    </td>
    <td>
      <label for="car${car.id}">
        ${car.hasPhoto ? svg.true : svg.false}
      </label>
    </td>
    <td><label for="car${car.id}">${car.addedDetails.date}</label></td>
    <td><label for="car${car.id}">${car.quantity}</label></td>
  </tr>
`).join("");
    const html = `<section>
    <h2>Cars found</h2>
    <div class="tableAdmin">
      <form action="/admin/edit-car" method="post">
        <div class="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Edit</th>
                <th>ID</th>
                <th>Name</th>
                <th>Make</th>
                <th>Code</th>
                <th>Base</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Case type</th>
                <th>Has case</th>
                <th>Has photo</th>
                <th>Added date</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
        <button type="submit">Edit Selected Car</button>
      </form>
    </div>
  </section>`;
    return html;
  };
  var generateSVG = (value) => {
    const svgData = {
      true: {
        label: "True",
        viewbox: "0 0 448 512",
        path: '<path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>'
      },
      false: {
        label: "False",
        viewbox: "0 0 384 512",
        path: '<path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>'
      },
      null: {
        label: "Null",
        viewbox: "0 0 512 512",
        path: '<path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/>'
      }
    };
    const data = svgData[value];
    return `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="${data.viewbox}" role="img" aria-label="${data.label}">
    ${data.path}
  </svg>`;
  };

  // src/admin/lib/fragments/formCarEdit.js
  var fragmentFormCarEdit = async (data, options = {}) => {
    const dataCarsAll = await servicesGithubDataCarsAll();
    const dataCar = { ...data };
    const categories = generateOptions3(getUniqueCarCategories(dataCarsAll), dataCar.categoryDetails.id);
    const cases = generateOptions3(getUniqueCarCaseTypes(dataCarsAll), dataCar.caseDetails.id);
    const html = `
    <!-- Edit Car Form Section -->
    <section class="fragmentContent adminCenter">
      <h2>Edit car form</h2>
      <div class="formContainer">
        <!-- Actual Form Begins -->
        <form action="/admin/edit-car" method="post" class="adminForm">

        <input type="hidden" name="id" id="id" value="${dataCar.id}">
        <input type="hidden" name="action" id="formAction" value="editSubmit">

        <div class="inputGroup">
          <p>ID: ${dataCar.id}</p>
        </div>

        <div class="inputGroup">
          <label for="base">Code:</label>
          <input type="text" id="code" name="code" value="${dataCar.code || ""}">
        </div>


        <div class="inputGroup">
          <label for="base">Base:</label>
          <input type="text" id="base" name="base" value="${dataCar.base || ""}" >
        </div>

        <div class="inputGroup">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value="${dataCar.name}" required>
        </div>

        <div class="inputGroup">
          <label for="make">Make:</label>
          <input type="text" id="make" name="make" value="${dataCar.make}" required>
        </div>

        <div class="inputGroup">
          <label for="category">Category:</label>
          <select id="category" name="category" required>
            <option value="" disabled>Select a category</option>
            ${categories}
          </select>
        </div>

        <div class="inputGroup">
          <label for="brand">Brand:</label>
          <input type="text" id="brand" name="brand" value="${dataCar.brand || ""}">
        </div>

        <div class="inputGroup">
          <label for="hasPhoto">Photo is online:</label>
          <input type="checkbox" id="hasPhoto" name="hasPhoto" ${dataCar.hasPhoto ? "checked" : ""}>
        </div>

        <fieldset class="inputGroup">
          <legend>Case Details</legend>
        
          <label for="caseType">Case Type:</label>
          <select id="caseType" name="caseType" required>
            <option value="" disabled>Select a type</option>
            ${cases}
          </select>
          
          <div class="radioGroup">
            <label>Has Case:</label>
            
            <div class="radioEntry">
              <label for="yes">Yes</label>
              <input type="radio" id="yes" name="hasCase" value="true" ${dataCar.caseDetails.status === true ? "checked" : ""}>
            </div>

            <div class="radioEntry">
              <label for="no">No</label>
              <input type="radio" id="no" name="hasCase" value="false" ${dataCar.caseDetails.status === false || dataCar.caseDetails.status === void 0 ? "checked" : ""}>
            </div>
            
            <div class="radioEntry">
              <label for="na">N/A</label>
              <input type="radio" id="na" name="hasCase" value="null" ${dataCar.caseDetails.status === null ? "checked" : ""}>
            </div>
          </div>
        </fieldset>

        <div class="inputGroup">
        <label for="quantity">Quantity:</label>
        <input type="number" id="quantity" name="quantity" min="1" value="${dataCar.quantity > 0 ? dataCar.quantity : 1}">
        </div>

        <button type="submit">Edit car</button>
      </form>
    </div>
  </section>`;
    return html;
  };
  var formCarEdit_default = fragmentFormCarEdit;
  var generateOptions3 = (items, selectedValue, valueProp = "id", nameProp = "name") => {
    return items.map((item) => `
    <option value="${item[valueProp]}" ${item[valueProp] === selectedValue ? "selected" : ""}>
      ${item[nameProp]}
    </option>
  `).join("");
  };

  // src/admin/lib/templates/carEdit.js
  var templateAdminCarEdit = async (request, options = {}) => {
    if (!options.feedback.search) {
      return await response(options);
    }
    const sections = [
      await formCarEdit_default(options.data)
    ].join("");
    return options.isAuthenticated ? sections : quickLogin(request) || sections;
  };
  var carEdit_default = templateAdminCarEdit;
  var response = async (options) => {
    const sections = [
      content_default(addedDetail3(options)),
      await formCarSearch_default()
    ];
    return sections;
  };
  var addedDetail3 = (options) => {
    const sections = [
      `<div class="adminCenter">`,
      `<h2>${options.feedback.message}</h2>`,
      `<p>Car ID searched for was: ${options.data.id}</p>`,
      `</div>`
    ].join("");
    return sections;
  };

  // src/admin/lib/handlers/template.js
  var handlerTemplate = async (request, options = {}) => {
    const url2 = new URL(request.url);
    const templateMappings = {
      "/admin": home_default,
      "/admin/add-car": carAdd_default,
      "/admin/search-car": carSearch_default,
      "/admin/edit-car": carEdit_default
    };
    const templateFunction = templateMappings[url2.pathname];
    if (templateFunction) {
      return new Response(
        await createPage(templateFunction, request, options),
        {
          status: 200,
          headers: {
            "Content-Type": "text/html",
            "x-robots-tag": "noindex"
          }
        }
      );
    }
    return new Response("template Handler");
  };
  var template_default = handlerTemplate;
  var createPage = async (templateFunction, request, options = {}) => {
    const {
      isAuthenticated = false,
      feedback = {
        success: null,
        message: null
      },
      data = null
    } = options;
    const sections = [
      documentHead_default,
      pageHead_default,
      pageBreadcrumbs_default,
      templateFunction,
      pageFooter_default,
      documentEnd_default
    ];
    const resolvedSections = await Promise.all(
      sections.map(async (section) => {
        const result = await section(request, options);
        return Array.isArray(result) ? result.join("") : result;
      })
    );
    return resolvedSections.join("");
  };

  // src/admin/lib/handlers/adminLogin.js
  var validName = ADMIN_NAME;
  var validPassword = ADMIN_PASSWORD;
  var handlerAdminLogin = async (request, options = {}) => {
    const formData = await request.formData();
    const submittedName = formData.get("username");
    const submittedPassword = formData.get("password");
    if (submittedName === validName && submittedPassword === validPassword) {
      const redirectTo = new URL(request.headers.get("Referer") || "/admin");
      const cookie = createCookie();
      if (redirectTo.pathname === "/admin" || isLoggedIn(request)) {
        return showAdmin(cookie, request);
      }
      return new Response(null, {
        status: 302,
        headers: {
          "Location": redirectTo,
          "Set-Cookie": cookie
        }
      });
    }
    return new Response("Invalid credentials. Please try again.", {
      status: 401,
      headers: {
        "Content-Type": "text/plain",
        "X-Robots-Tag": "noindex"
      }
    });
  };
  var adminLogin_default = handlerAdminLogin;
  var showAdmin = async (cookie, request) => {
    let content3 = await template_default(request, {
      isAuthenticated: true
    });
    if (!(content3 instanceof Response)) {
      content3 = new Response(content3, {
        status: 200,
        headers: {
          "x-robots-x": "noindex",
          "Content-Type": "text/html"
        }
      });
    }
    content3.headers.set("Set-Cookie", cookie);
    return content3;
  };
  var createCookie = () => {
    const expiryDate = /* @__PURE__ */ new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    const cookie = `admin-authenticated=true; Expires=${expiryDate.toUTCString()}; HttpOnly; SameSite=Strict; Path=/admin;`;
    return cookie;
  };

  // src/admin/lib/handlers/adminLogout.js
  var handlerAdminLogout = async (request) => {
    const redirectTo = request.headers.get("Referer") || "/admin";
    return new Response(null, {
      status: 302,
      // Using 302 for temporary redirect
      headers: {
        "Location": redirectTo,
        "Set-Cookie": "admin-authenticated=; HttpOnly; SameSite=Strict; Path=/admin; Expires=Thu, 01 Jan 1970 00:00:00 GMT;"
        // This will effectively delete the cookie
      }
    });
  };
  var adminLogout_default = handlerAdminLogout;

  // src/admin/lib/services/github.js
  var apiKey2 = GITHUB_API_KEY;
  var REPO_OWNER2 = "Kevin-Ellen";
  var REPO_NAME2 = "tinyfords-v2";
  var FILE_PATH2 = "src/data/cars.json";
  var url = `https://api.github.com/repos/${REPO_OWNER2}/${REPO_NAME2}/contents/${FILE_PATH2}`;
  var adminGitHubGetCarsData = async () => {
    const response2 = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${apiKey2}`,
        "User-Agent": "tinyfords-v2-app",
        "Accept": "application/vnd.github+json"
      }
    });
    const data = await response2.json();
    const decoded = base64Decode(data.content);
    const fileContent = JSON.parse(decodeURIComponent(decoded));
    return {
      sha: data.sha,
      data: fileContent
    };
  };
  var adminGitHubSubmitCarsData = async (data, sha) => {
    const updatedContentBase64 = btoa(JSON.stringify(data));
    const response2 = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${apiKey2}`,
        "User-Agent": "tinyfords-v2-app",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Added/edited a car through the interface",
        content: updatedContentBase64,
        sha
        // SHA of the current version of the file
      })
    });
    const responseData = await response2.json();
    if (response2.ok) {
      return { success: true, message: "Car added successfully!" };
    } else {
      return { success: false, message: responseData.message };
    }
  };

  // src/admin/lib/handlers/carAdd.js
  var handlerAdminCarAdd = async (request) => {
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    const dataCarsAll = await adminGitHubGetCarsData();
    const newCar = carConstruct_default(dataCarsAll.data, formDataObject);
    const dupeCheck = duplicateChecker(dataCarsAll.data, ["id", "code"], newCar);
    if (!dupeCheck.success) {
      return template_default(request, {
        feedback: {
          success: false,
          message: `Fail: ${dupeCheck.message}`
        },
        data: newCar
      });
    }
    newCar.addedDetails.by = ADMIN_NAME;
    newCar.addedDetails.date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    dataCarsAll.data.push(newCar);
    const response2 = await adminGitHubSubmitCarsData(dataCarsAll.data, dataCarsAll.sha);
    return template_default(request, {
      feedback: {
        success: response2.success,
        message: response2.message
      },
      data: newCar
    });
  };
  var carAdd_default2 = handlerAdminCarAdd;

  // src/lib/utils/searchTools.js
  var toolShapeSearchFormData = (dataCarsAll, data) => {
    const shapedData = {};
    if ("hasPhoto" in data) {
      shapedData.hasPhoto = data.hasPhoto === "true";
    }
    if ("hasCase" in data) {
      if (data.caseType) {
        const caseDetails = getCaseById(dataCarsAll, data.caseType);
        if (caseDetails) {
          shapedData.caseDetails = caseDetails;
          shapedData.caseDetails.status = shapedData.hasCase;
        }
      } else {
        shapedData.caseDetails = {};
      }
      shapedData.caseDetails.status = data.hasCase === "true" ? true : data.hasCase === "false" ? false : null;
      ["hasCase", "caseType"].forEach((prop) => delete data[prop]);
    }
    if (data.category) {
      const categoryDetails = getCategoryById(dataCarsAll, data.category);
      if (categoryDetails) {
        shapedData.categoryDetails = categoryDetails;
      }
      ["category"].forEach((prop) => delete data[prop]);
    }
    if (data.id) {
      data.id = parseInt(data.id, 10);
    }
    for (const key in data) {
      shapedData[key] = data[key];
      if (shapedData[key] === "" || shapedData[key] === null) {
        delete shapedData[key];
      }
    }
    return shapedData;
  };
  var toolCarSearch = (car, criteria) => {
    for (const key in criteria) {
      if (typeof criteria[key] === "object" && criteria[key] !== null) {
        for (const subKey in criteria[key]) {
          if (car[key][subKey] !== criteria[key][subKey]) {
            return false;
          }
        }
      } else if (car[key] !== criteria[key]) {
        return false;
      }
    }
    return true;
  };

  // src/admin/lib/handlers/carSearch.js
  var handlerAdminCarSearch = async (request) => {
    const dataCarsAll = await servicesGithubDataCarsAll();
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    const shapedData = toolShapeSearchFormData(dataCarsAll, formDataObject);
    const filteredCars = dataCarsAll.filter((car) => toolCarSearch(car, shapedData));
    return template_default(request, {
      feedback: {
        success: true,
        message: getFeedbackMessage(filteredCars.length)
      },
      data: filteredCars
    });
  };
  var carSearch_default2 = handlerAdminCarSearch;
  var getFeedbackMessage = (count) => {
    if (count === 0)
      return "Found no cars";
    if (count === 1)
      return "Found 1 car";
    return `Found ${count} cars`;
  };

  // src/admin/lib/handlers/carEdit.js
  var handlerAdminCarEdit = async (request, options) => {
    const dataCarsAll = await adminGitHubGetCarsData();
    const formData = await request.formData();
    const formDataObject = Object.fromEntries(formData.entries());
    if (formDataObject.action == "editSubmit") {
      const updatedCar = carConstruct_default(dataCarsAll.data, formDataObject);
      const dupeCheck = duplicateChecker(dataCarsAll.data, ["code"], updatedCar);
      if (!dupeCheck.success) {
        return carResponse(request, updatedCar, `Fail: ${dupeCheck.message}`, false);
      }
      const changes = changeCheck(getCarById(dataCarsAll.data, updatedCar.id), updatedCar);
      if (!changes) {
        return carResponse(request, updatedCar, "Fail: No changes been found", false);
      }
      const response2 = await submitData(dataCarsAll, updatedCar);
      if (!response2.success) {
        return carResponse(request, updatedCar, `Fail: ${response2.message}`, false);
      }
      return carResponse(request, updatedCar, "Car changed successfully!", true);
    }
    const car = getCarById(dataCarsAll.data, formDataObject.carId);
    if (!car) {
      return carResponse(request, { id: formDataObject.carId }, "No car found", false);
    }
    return carResponse(request, car, "Car found", true, true);
  };
  var carEdit_default2 = handlerAdminCarEdit;
  var carResponse = (request, data, message, success, search = null) => {
    return template_default(request, {
      feedback: {
        success,
        message,
        search
      },
      data
    });
  };
  var changeCheck = (oldCar, newCar) => {
    for (let key in oldCar) {
      if (key === "addedDetails")
        continue;
      if (oldCar.hasOwnProperty(key) && newCar.hasOwnProperty(key)) {
        if (typeof oldCar[key] === "object" && oldCar[key] !== null && newCar[key] !== null) {
          if (changeCheck(oldCar[key], newCar[key])) {
            return true;
          }
        } else if (oldCar[key] !== newCar[key]) {
          return true;
        }
      }
    }
    return false;
  };
  var submitData = async (dataCarsAll, updatedCar) => {
    delete updatedCar.addedDetails;
    const updatedDataCarsAll = dataCarsAll.data.map((car) => {
      if (car.id === updatedCar.id) {
        return {
          ...car,
          // Spread properties of the original car
          ...updatedCar
          // Overwrite with properties of updatedCar where they exist
        };
      }
      return car;
    });
    const response2 = await adminGitHubSubmitCarsData(updatedDataCarsAll, dataCarsAll.sha);
    return response2;
  };

  // src/lib/handlers/error.js
  var handleError = (status, message) => {
    return new Response(`Error: ${message}`, { status });
  };
  var error_default = handleError;

  // src/admin/indexAdmin.js
  var indexAdmin = async (request) => {
    const url2 = new URL(request.url);
    if (request.method === "GET") {
      switch (url2.pathname) {
        case "/admin":
        case "/admin/add-car":
        case "/admin/search-car":
          return await template_default(request);
        case "/admin/logout":
          return adminLogout_default(request);
        default:
          return error_default(404, "GET: Not Found");
      }
    }
    if (request.method === "POST") {
      switch (url2.pathname) {
        case "/admin":
          return adminLogin_default(request);
        case "/admin/add-car":
          return carAdd_default2(request);
        case "/admin/search-car":
          return carSearch_default2(request);
        case "/admin/edit-car":
          return carEdit_default2(request);
        default:
          return error_default(404, "POST: Not Found");
      }
    }
    return error_default(405, "Method not allowed");
  };
  var indexAdmin_default = indexAdmin;

  // src/lib/api/robotsTxt.js
  var apiRobotsTxt = (url2) => {
    return new Response(robotstxtcontent(url2), { status: 200 });
  };
  var robotsTxt_default = apiRobotsTxt;
  var robotstxtcontent = (url2) => `
# Hello!
user-agent: *
allow: /

sitemap: ${url2.protocol}//${url2.host}/sitemap.xml
`;

  // src/lib/api/manifest.js
  var apiManifest = () => {
    return new Response(content, { status: 200, headers: { "content-type": "application/json" } });
  };
  var manifest_default = apiManifest;
  var content = `{
  "name": "Tiny Fords",
  "short_name": "TinyFords",
  "theme_color": "rgb(0, 84, 144)",
  "background_color": "rgb(0, 84, 144)",
  "display": "standalone",
  "start_url": "/",
  "id": "/",
  "shortcuts": [
    {
      "name": "Hot Wheels",
      "url": "/hotwheels",
      "icons": [
        {
          "src": "/images/icons/hot-wheels-96x96.png",
          "sizes": "96x96",
          "type": "image/png"
        }
      ]
    },
    {
      "name": "Matchbox",
      "url": "/matchbox",
      "icons": [
        {
          "src": "/images/icons/matchbox-96x96.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "Other",
      "url": "/other",
      "icons": [
        {
          "src": "/images/icons/all-96x96.png",
          "sizes": "96x96"
        }
      ]
    },
    {
      "name": "All",
      "url": "/all",
      "icons": [
        {
          "src": "/images/icons/all-96x96.png",
          "sizes": "96x96"
        }
      ]
    }
  ],
  "icons": [
    {
      "src": "/images/icons/android-icon-36x36.png",
      "sizes": "36x36",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/images/icons/maskable-icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/images/icons/maskable-icon-1024x1024.png",
      "sizes": "1024x1024",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}`;

  // wrangler-module-Text:./771f8965b7e32f40b8967e4beee8bd93c023b128-entry-pwa.js
  var f8965b7e32f40b8967e4beee8bd93c023b128_entry_pwa_default = __771f8965b7e32f40b8967e4beee8bd93c023b128_entry_pwa_js;

  // src/lib/utils/helpersRenders.js
  var assembleHTML = (strings) => strings.join("");
  var assignClassName = (className) => className ? `class="${className}"` : "";

  // src/lib/fragments/gridCars.js
  var fragmentGridCars = (data) => {
    const html = ["<section>"];
    if (data.heading) {
      const heading = {
        element: data.heading.element || "h2",
        content: data.heading.content || "Results",
        className: assignClassName(data.heading.attributes?.className)
      };
      html.push(`<${heading.element} ${heading.className}>${heading.content}</${heading.element}>`);
      html.push(createGrid(data.data));
    }
    html.push("</section>");
    return assembleHTML(html);
  };
  var gridCars_default = fragmentGridCars;
  var createGrid = (content3) => {
    const cards = content3.map(createCard).join("");
    const html = `<div class="fragmentCarsGrid">
    ${cards}
  </div>`;
    return html;
  };
  var createCard = (car) => {
    const imageUrl = createImgPath(car);
    return `
    <div class="fragmentGridCard">
      <img src="${imageUrl}" height="150" width="150" alt="${car.brand} ${car.name} ${car.code ? `- ${car.code}` : ""}" loading="lazy">
      <ul class="fragmentGridCardContent">
        <li><h3>${car.name}</h3></li>
        <li><strong>Make:</strong> ${car.make}</li>
        ${car.code ? `<li><strong>Code:</strong> ${car.code.toUpperCase()}</li>` : ""}
        <li><strong>Added:</strong> ${car.addedDetails.date}</li>
      </ul>
    </div>`;
  };
  var createImgPath = (car) => {
    const baseFolder = `/images/${car.categoryDetails.folder}/front-250/`;
    const postfix = `-front-250.jpg`;
    let imagePath;
    if (car.hasPhoto) {
      if (car.categoryDetails.id === "ot") {
        imagePath = `${car.categoryDetails.id}-${car.id}`;
      } else {
        imagePath = `${car.categoryDetails.id}-${car.code}`;
      }
    } else {
      imagePath = "coming-soon";
    }
    return `${baseFolder}${imagePath}${postfix}`;
  };

  // src/lib/api/sw.js
  var apiSw = async (url2) => {
    const cacheData = await buildPageCache(url2);
    const carImageUrls = buildCarImageCache();
    const pageImages = extractImageUrls(appData.pages.all);
    const allUrlsToCache = [...carImageUrls, ...pageImages, ...cacheData, ...carImageUrls];
    const uniqueUrlsToCache = [...new Set(allUrlsToCache)];
    const urlsToCacheString = `const urlsToCache = ${JSON.stringify(uniqueUrlsToCache)};`;
    const swCode = [
      urlsToCacheString,
      init
    ].join("");
    return new Response(swCode, { status: 200, headers: { "content-type": "application/javascript" } });
  };
  var sw_default = apiSw;
  var buildPageCache = async (url2) => {
    await apiAppData();
    const data = appData.pages.all;
    url2 = new URL(url2);
    const slugsPromises = data.filter((page) => page.visibility && page.visibility.active === true).flatMap((page) => {
      if (page.template === "collection") {
        const carCount = getCarsByCategoryId(page.id).length || appData.cars.all.length;
        return generatePagedSlugs(page.slug, carCount, ITEMS_PER_PAGE.collection);
      } else {
        return [page.slug];
      }
    });
    const slugs = slugsPromises;
    return slugs;
  };
  var init = f8965b7e32f40b8967e4beee8bd93c023b128_entry_pwa_default;
  var generatePagedSlugs = (slug, carCount, itemsPerPage) => {
    const totalPages = Math.ceil(carCount / itemsPerPage);
    const slugs = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1) {
        slugs.push(`${slug}`);
      } else {
        slugs.push(`${slug}?page=${i}`);
      }
    }
    return slugs;
  };
  var buildCarImageCache = () => {
    return appData.cars.all.map((car) => createImgPath(car));
  };
  var extractImageUrls = (obj, urls2 = []) => {
    if (typeof obj !== "object" || obj === null) {
      return urls2;
    }
    for (let key in obj) {
      if (typeof obj[key] === "string" && obj[key].endsWith(".jpg")) {
        urls2.push(obj[key]);
      } else if (typeof obj[key] === "object") {
        extractImageUrls(obj[key], urls2);
      }
    }
    return urls2;
  };

  // src/lib/api/sitemap.js
  var apiXmlSitemap = async (url2) => {
    const dataPagesAll = await servicesGithubDataPageAll();
    return new Response(content2(dataPagesAll, url2), { status: 200, headers: { "content-type": "application/xml" } });
  };
  var sitemap_default = apiXmlSitemap;
  var content2 = (data, url2) => {
    const entries = data.filter((entry) => entry.xmlSitemap).map((entry) => `<url><loc>${url2.origin}${entry.slug}</loc></url>`).join("");
    const sections = [
      `<?xml version="1.0" encoding="utf-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      entries,
      `</urlset>`
    ].join("");
    return sections;
  };

  // src/lib/api/outputJson.js
  var apiJson = (url2) => {
    const type = url2.pathname.replace("/json/", "");
    switch (type) {
      case "cars":
        return getData(servicesGithubDataCarsAll);
      case "pages":
        return getData(servicesGithubDataPageAll);
      default:
        return new Response("Not Found", { status: 404, headers: { "content-type": "text/plain" } });
    }
  };
  var outputJson_default = apiJson;
  var getData = async (func) => {
    const data = await func();
    return new Response(JSON.stringify(data), { status: 200, headers: { "content-type": "application/json", "x-robots-tag": "noindex" } });
  };

  // src/lib/api/api.js
  var apiCreator = async (url2) => {
    await apiAppData();
    switch (url2.pathname) {
      case "/api/cars":
        return new Response(apiCars(), { status: 200, headers: { "content-type": "text/html", "x-robots-tag": "noindex" } });
      case "/api/cases":
        return new Response(apiCases(), { status: 200, headers: { "content-type": "text/html", "x-robots-tag": "noindex" } });
      default:
        return error_default(403, "Not allowed");
    }
  };
  var api_default = apiCreator;
  var apiCars = () => {
    const headers2 = [
      "Name",
      "Make",
      "Brand",
      "Code"
    ];
    const data = [...appData.cars.all];
    return createTable2(headers2, data);
  };
  var apiCases = () => {
    const allCars = [...appData.cars.all];
    const cases = {
      long: {
        name: "Long card",
        has: 0,
        hasNot: 0
      },
      short: {
        name: "Short card",
        has: 0,
        hasNot: 0
      },
      premium: {
        name: "Premium",
        has: 0,
        hasNot: 0
      },
      transport: {
        name: "Team Transport",
        has: 0,
        hasNot: 0
      }
    };
    allCars.forEach((car) => {
      const caseId = car.caseDetails.id;
      if (cases[caseId]) {
        cases[caseId][car.caseDetails.status ? "has" : "hasNot"] += 1;
      }
    });
    const headers2 = [
      "Type",
      "In case",
      "Not in case"
    ];
    const data = Object.entries(cases).map(([key, value]) => {
      return {
        [headers2[0].toLowerCase()]: value.name,
        // 'Type': 'Long card'
        [headers2[1].toLowerCase()]: value.has,
        // 'In case': 47
        [headers2[2].toLowerCase()]: value.hasNot
        // 'Not in case': 42
      };
    });
    return createTable2(headers2, data);
  };
  var createTable2 = (headers2, data) => {
    const html = [openHtml];
    html.push("<table>");
    html.push("<thead>");
    html.push("<tr>");
    headers2.forEach((head) => {
      html.push(`<th>${head}</th>`);
    });
    html.push("</tr>");
    html.push("</thead>");
    html.push("<tbody>");
    data.forEach((entry) => {
      html.push("<tr>");
      headers2.forEach((head) => {
        html.push(`<td>${entry[head.toLowerCase()]}</td>`);
      });
      html.push("</tr>");
    });
    html.push("</tbody>");
    html.push("</table>");
    html.push(closeHtml);
    return assembleHTML(html);
  };
  var openHtml = `<!doctype html><html lang="en"><head><title>Collection table</title></head><body>`;
  var closeHtml = `</body></html>`;

  // src/lib/handlers/static.js
  var STATIC_CACHE_TIME = 30 * 24 * 60 * 60 * 1e3;
  var handleStatic = (url2, request = {}) => {
    if (url2.pathname.startsWith("/images/")) {
      return imageRouter(url2);
    }
    if (url2.pathname.startsWith("/fonts/")) {
      return routerFonts(url2);
    }
    if (url2.pathname.startsWith("/json/")) {
      return outputJson_default(url2);
    }
    if (url2.pathname.startsWith("/api/")) {
      return api_default(url2);
    }
    switch (url2.pathname) {
      case "/favicon.ico":
        url2.pathname = `/images/icons${url2.pathname}`;
        return imageRouter(url2);
      case "/robots.txt":
        return robotsTxt_default(url2);
      case "/manifest.json":
        return manifest_default();
      case "/sitemap.xml":
        return sitemap_default(url2);
      case "/service-worker.js":
        return sw_default(url2);
      default:
        return new Response("Not Found - static", { status: 404 });
    }
  };
  var static_default = handleStatic;
  var routerFonts = async (url2) => {
    try {
      const newUrl = new URL(url2);
      newUrl.protocol = "https:";
      newUrl.host = "fonts.gstatic.com";
      newUrl.port = "";
      newUrl.pathname = `${newUrl.pathname.replace("/fonts/", "")}`;
      let response2 = await fetch(newUrl.toString(), {
        cf: {
          cacheTtl: STATIC_CACHE_TIME,
          cacheEverything: true,
          cacheKey: newUrl.toString()
        }
      });
      response2 = new Response(response2.body, response2);
      if (!response2.ok) {
        throw new Error(`Error fetching font: ${response2.statusText}`);
      }
      response2.headers.set("Cache-Control", `public, max-age=${STATIC_CACHE_TIME}`);
      return response2;
    } catch (error) {
      return error_default(404, `Font not found: ${error}`);
    }
  };
  var imageRouter = async (url2) => {
    try {
      const { headers: headers2, data } = await servicesGithubImageGetter(url2.pathname);
      const response2 = new Response(data, {
        headers: {
          "Content-Type": determineContentType(url2),
          "Cache-Control": `public, max-age=${STATIC_CACHE_TIME}`,
          "Etag": headers2.etag
        },
        cf: {
          cacheTtl: STATIC_CACHE_TIME,
          cacheEverything: true,
          cacheKey: url2.toString()
        }
      });
      if (!response2.ok) {
        throw new Error(`Error fetching image: ${response2.statusText}`);
      }
      return response2;
    } catch (error) {
      return error_default(404, `Image not found: ${error}`);
    }
  };
  var determineContentType = (url2) => {
    const fileExtension = url2.pathname.split(".").pop().toLowerCase();
    const mimeTypes = {
      "jpg": "image/jpeg",
      "jpeg": "image/jpeg",
      "png": "image/png",
      "gif": "image/gif",
      "webp": "image/webp"
      // ... add other extensions and MIME types as needed
    };
    return mimeTypes[fileExtension] || "application/octet-stream";
  };

  // wrangler-module-Text:./0ff69fd4e0fb5e10ed95541d44101c301a44586a-styles.css
  var ff69fd4e0fb5e10ed95541d44101c301a44586a_styles_default = __0ff69fd4e0fb5e10ed95541d44101c301a44586a_styles_css;

  // src/lib/construction/documentHead.js
  var documentHead2 = (data = appData) => {
    const { pages: { current } } = data;
    const html = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
        <style>
          ${ff69fd4e0fb5e10ed95541d44101c301a44586a_styles_default}
        </style>
        <title>${current.metadata.title}</title>
        <meta property="og:locale" content="en_GB">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Tiny Fords">
        ${current.status === 200 && current.template !== "offline" && current.template !== "admin" ? `<meta name="description" content="${current.metadata.description}">
          <link rel="canonical" href="${current.canonical}">
          <meta property="og:title" content="${current.socialMedia.title}">
          <meta property="og:description" content="${current.socialMedia.description}">
          <meta property="og:url" content="${current.canonical}">
          <meta property="og:image" content="${current.url.protocol}//${current.url.host}/images/social-media/4080-2142/${current.socialMedia.image}-4080-2142.jpg">
          <meta property="og:image:width" content="4080">
          <meta property="og:image:height" content="2142">
          <meta property="og:image:type" content="image/jpeg">

          <meta property="og:image" content="${current.url.protocol}//${current.url.host}/images/social-media/256/${current.socialMedia.image}-256.jpg">
          <meta property="og:image:width" content="256">
          <meta property="og:image:height" content="256">
          <meta property="og:image:type" content="image/jpeg">

          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:creator" content="@kevin_ellen_">
          <meta name="twitter:title" content="${current.socialMedia.title}">
          <meta name="twitter:description" content="${current.socialMedia.description}">
          <meta name="twitter:image" content="${current.url.protocol}//${current.url.host}/images/social-media/4080-2142/${current.socialMedia.imageName}-4080-2142.jpg">
          ` : ""}
        <link rel="apple-touch-icon" sizes="57x57" href="/images/icons/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/images/icons/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/images/icons/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/images/icons/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/images/icons/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/images/icons/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="//iconsapple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/images/icons/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="/images/icons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png">
        <link rel="manifest" href="/manifest.json">
        <meta name="msapplication-TileColor" content="#005490">
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png">
        <meta name="theme-color" content="#005490">
      </head>
      <body>`;
    return html;
  };
  var documentHead_default2 = documentHead2;

  // wrangler-module-Text:./864ce3fc4c03bd3553d2c1bfcebdb4b57393d0a8-init-spa.js
  var ce3fc4c03bd3553d2c1bfcebdb4b57393d0a8_init_spa_default = __864ce3fc4c03bd3553d2c1bfcebdb4b57393d0a8_init_spa_js;

  // wrangler-module-Text:./b69dad786934954e047bb86c036e042e343bf608-navigation-spa.js
  var b69dad786934954e047bb86c036e042e343bf608_navigation_spa_default = __b69dad786934954e047bb86c036e042e343bf608_navigation_spa_js;

  // wrangler-module-Text:./c816affb52573c417020ac1087b27c39cc355574-appstate-spa.js
  var c816affb52573c417020ac1087b27c39cc355574_appstate_spa_default = __c816affb52573c417020ac1087b27c39cc355574_appstate_spa_js;

  // wrangler-module-Text:./964b05abc6ae215eb1b1ec66020f594020a14e77-template-spa.js
  var b05abc6ae215eb1b1ec66020f594020a14e77_template_spa_default = __964b05abc6ae215eb1b1ec66020f594020a14e77_template_spa_js;

  // wrangler-module-Text:./19869fb12348258eefd8ea4d591e7d778aa5fc14-search-spa.js
  var fb12348258eefd8ea4d591e7d778aa5fc14_search_spa_default = __19869fb12348258eefd8ea4d591e7d778aa5fc14_search_spa_js;

  // wrangler-module-Text:./2ec6b9dc0c9ba12c9738470af5e885ff339a976d-createPagination-spa.js
  var ec6b9dc0c9ba12c9738470af5e885ff339a976d_createPagination_spa_default = __2ec6b9dc0c9ba12c9738470af5e885ff339a976d_createPagination_spa_js;

  // wrangler-module-Text:./4f9fc078246d4d4505d9b3da1ca80bdca95e8b35-updateHeadings-spa.js
  var f9fc078246d4d4505d9b3da1ca80bdca95e8b35_updateHeadings_spa_default = __4f9fc078246d4d4505d9b3da1ca80bdca95e8b35_updateHeadings_spa_js;

  // wrangler-module-Text:./25edf53458fff2fbf41bdc0dfbcc655f7b339b13-createGrid-spa.js
  var edf53458fff2fbf41bdc0dfbcc655f7b339b13_createGrid_spa_default = __25edf53458fff2fbf41bdc0dfbcc655f7b339b13_createGrid_spa_js;

  // wrangler-module-Text:./658b77f0e383d176cff295a46183814cc795c7b1-createBreadcrumbs-spa.js
  var b77f0e383d176cff295a46183814cc795c7b1_createBreadcrumbs_spa_default = __658b77f0e383d176cff295a46183814cc795c7b1_createBreadcrumbs_spa_js;

  // wrangler-module-Text:./7aff8754c106f3ed589f3d6efb70c6d0869241cd-renderHome-spa.js
  var aff8754c106f3ed589f3d6efb70c6d0869241cd_renderHome_spa_default = __7aff8754c106f3ed589f3d6efb70c6d0869241cd_renderHome_spa_js;

  // wrangler-module-Text:./448c5cae7d1d1a972bd0585ae91ecef90a0394a0-renderCollection-spa.js
  var c5cae7d1d1a972bd0585ae91ecef90a0394a0_renderCollection_spa_default = __448c5cae7d1d1a972bd0585ae91ecef90a0394a0_renderCollection_spa_js;

  // wrangler-module-Text:./f7efc433bf9264515ad917dd458decb51a2a053b-renderContent-spa.js
  var f7efc433bf9264515ad917dd458decb51a2a053b_renderContent_spa_default = __f7efc433bf9264515ad917dd458decb51a2a053b_renderContent_spa_js;

  // wrangler-module-Text:./ddc7c442650592a13fba18a4701302d1dc378707-renderCommentItems-spa.js
  var ddc7c442650592a13fba18a4701302d1dc378707_renderCommentItems_spa_default = __ddc7c442650592a13fba18a4701302d1dc378707_renderCommentItems_spa_js;

  // wrangler-module-Text:./7974a5b9edb561ebcf8a2fd9f36e3839dd390c87-tools-spa.js
  var a5b9edb561ebcf8a2fd9f36e3839dd390c87_tools_spa_default = __7974a5b9edb561ebcf8a2fd9f36e3839dd390c87_tools_spa_js;

  // wrangler-module-Text:./beeeee6822f45416f30d52faf09ef56228c3cd97-init-pwa.js
  var beeeee6822f45416f30d52faf09ef56228c3cd97_init_pwa_default = __beeeee6822f45416f30d52faf09ef56228c3cd97_init_pwa_js;

  // src/lib/construction/documentEnd.js
  var documentEnd2 = (data = appData) => {
    const html = `
        ${templateGrid()}
        <script>
          window.__APP_STATE__ = ${JSON.stringify(appData)};
        <\/script>
        <script>
          
          ${a5b9edb561ebcf8a2fd9f36e3839dd390c87_tools_spa_default}
          ${c816affb52573c417020ac1087b27c39cc355574_appstate_spa_default}

          ${ec6b9dc0c9ba12c9738470af5e885ff339a976d_createPagination_spa_default}
          ${f9fc078246d4d4505d9b3da1ca80bdca95e8b35_updateHeadings_spa_default}
          ${edf53458fff2fbf41bdc0dfbcc655f7b339b13_createGrid_spa_default}
          ${b77f0e383d176cff295a46183814cc795c7b1_createBreadcrumbs_spa_default}
          
          ${aff8754c106f3ed589f3d6efb70c6d0869241cd_renderHome_spa_default}
          ${c5cae7d1d1a972bd0585ae91ecef90a0394a0_renderCollection_spa_default}
          ${f7efc433bf9264515ad917dd458decb51a2a053b_renderContent_spa_default}
          ${ddc7c442650592a13fba18a4701302d1dc378707_renderCommentItems_spa_default}
          
          ${b05abc6ae215eb1b1ec66020f594020a14e77_template_spa_default}
          ${fb12348258eefd8ea4d591e7d778aa5fc14_search_spa_default}
          ${b69dad786934954e047bb86c036e042e343bf608_navigation_spa_default}
          ${ce3fc4c03bd3553d2c1bfcebdb4b57393d0a8_init_spa_default}
        
        <\/script>
        <script>
          ${beeeee6822f45416f30d52faf09ef56228c3cd97_init_pwa_default}
        <\/script>
      </body>
    </html>
  `;
    return html;
  };
  var documentEnd_default2 = documentEnd2;
  var templateGrid = () => {
    return `<template id="gridItem">
    <div class="fragmentGridCard">
      <img height="150" width="150" loading="lazy" class="templateGridImage">
      <ul class="fragmentGridCardContent">
        <li><h3></h3></li>
        <li class="templateGridMake"><strong>Make:</strong> <span></span></li>
        <li class="templateGridCode"><strong>Code:</strong> <span></span></li>
        <li class="templateGridAdded"><strong>Added:</strong> <span></span></li>
      </ul>
    </div>
  </template>`;
  };

  // src/lib/fragments/searchBar.js
  var fragmentSearchBar = (url2 = appData.pages.current.url.pathname, data = appData) => {
    let value = null;
    if (data.search?.success && data.search?.action === "search") {
      value = data.search.searchValue;
    }
    const html = `<div class="siteSearch">
    <form class="searchBar" action="${url2}" method="post">
      <input type="search" required placeholder="Search query" autocomplete="off" name="q" ${value ? `value="${value}"` : ""}>
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"></path></svg>
          <span class="a11y">Search</span>
        </button>
    </form>
  </div>`;
    return html;
  };
  var searchBar_default = fragmentSearchBar;

  // src/lib/construction/pageHead.js
  var pageHead2 = (data = appData) => {
    const links = createLinks(data.pages.all);
    const siteSearchUrl = { ...data.pages.current.url };
    siteSearchUrl.pathname = "/all";
    const html = `<header class="siteHeader">
    <div class="siteHeaderContainer">

      <label class="siteNavLabel" for="siteNavBox">
        <svg viewBox="0 0 100 80" width="25" height="25">
          <rect width="100" height="20" rx="10"></rect>
          <rect y="30" width="100" height="20" rx="10"></rect>
          <rect y="60" width="100" height="20" rx="10"></rect>
        </svg>
        <span class="a11y">Open main menu</span>
      </label>

      <p class="siteNavName"><a href="/">Tiny Fords</a></p>

      <div class="siteNavRight">
        <label class="siteNavLabel" for="siteSearch">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"></path>
          </svg>
          <span class="a11y">Open search box</span>
        </label>
      </div>

      <input type="checkbox" class="siteNavBox" id="siteNavBox">
      <nav class="siteNavMenu" aria-label="Main menu">
        <ul class="mainMenu">
          ${links}
        </ul>
      </nav>

      <input type="checkbox" class="siteNavBox" id="siteSearch">
      ${searchBar_default(siteSearchUrl.pathname, data.options)}

    </div>
  </header>
  <div id="pageContent">`;
    return html;
  };
  var pageHead_default2 = pageHead2;
  var createLinks = (data) => {
    const entries = data.filter((page) => page.status === 200 && page.visibility.active === true && page.visibility.mainNav === true).map((page) => `<li><a href="${page.slug}">${page.name}</a></li><li aria-hidden="true" class="divider">/</li>`).join("");
    return entries;
  };

  // src/lib/construction/pageBreadcrumbs.js
  var pageBreadcrumbs2 = (data = appData) => {
    if (!data.pages.current.breadcrumbList) {
      return `<nav class="breadcrumbsContainer" aria-label="breadcrumb"></nav>`;
    }
    const html = `
      <nav class="breadcrumbsContainer" aria-label="breadcrumb">
        <ul class="breadcrumbs">
          ${createBreadcrumbs(data.breadcrumbs)}
        </ul>
      </nav>
  `;
    return html;
  };
  var pageBreadcrumbs_default2 = pageBreadcrumbs2;
  var createBreadcrumbs = (data) => {
    return data.map((obj, index, arr) => {
      const isLastItem = index === arr.length - 1;
      const content3 = isLastItem ? `${obj.name}` : `<a href="${obj.slug}">${obj.name}</a>`;
      return `
      <li ${isLastItem ? 'class="lastItem" aria-current="page"' : ""}>
        ${content3}
      </li>
      ${isLastItem ? "" : `<li aria-hidden="true">/</li>`}
    `;
    }).join("");
  };

  // src/lib/construction/pageFooter.js
  var pageFooter2 = (data = appData) => {
    const links = createLinks2(data.pages.all);
    return `
    </div>
    <footer class="siteFooter">
      <ul class="siteFooterLinks">
        ${links}
      </ul>
      <h2>Thanks for visiting Tiny Fords</h2>
      <p>Here at Tiny Fords, we're passionate about Ford die-cast cars, and we're thrilled to share our collection with you. This non-commercial site is a labor of love, created by Kevin to keep track of his collection and avoid buying duplicates. We're proud to say it was made in 2023, using a Cloudflare Worker on a free account. We hope you've enjoyed exploring our collection and we look forward to your next visit! Don't forget to check out the contact page if you have any question or feedback.</p>
    </footer>
  `;
  };
  var pageFooter_default2 = pageFooter2;
  var createLinks2 = (data) => {
    const categories = {
      "Collections": ["/hotwheels", "/matchbox", "/other", "/all"],
      "About": ["/about", "/about/how-to-find-toy-number", "/about/klas-car-keepers"]
      // Add '/about/klas-protectors' if it's part of your data
    };
    const entries = Object.entries(categories).map(([categoryName, slugs]) => {
      const links = data.filter((page) => {
        if (!page.visibility) {
          console.error("Visibility property missing on page: ", page);
          return false;
        }
        return page.status === 200 && page.visibility.active === true && page.visibility.footer === true && slugs.includes(page.slug);
      }).map((page) => `<li><a href="${page.slug}">${page.name}</a></li><li aria-hidden="true">/</li>`).join("");
      return `<li>${categoryName} <span> > </span><ul>${links}</ul></li>`;
    }).join("");
    return `<li><a href="/">Home</a></li>${entries}`;
  };

  // src/lib/fragments/fragmentCreators.js
  var createIntroTemplate = (obj) => {
    const container = {
      element: obj.container?.element || "section",
      className: assignClassName(obj.container?.className)
    };
    const heading = {
      element: obj.heading?.element || "h2",
      className: assignClassName(obj.heading?.className),
      content: obj.heading?.content || false
    };
    const html = [];
    html.push(`<${container.element} ${container.className}>`);
    if (heading.content) {
      html.push(`<${heading.element} ${heading.className}>${heading.content}</${heading.element}>`);
    }
    if (obj.entries) {
      obj.entries.forEach((entry) => {
        switch (entry.type) {
          case "text":
            html.push(generateTextEntry(entry));
        }
      });
    }
    html.push(`</${container.element}>`);
    return assembleHTML(html);
  };
  var generateTextEntry = (obj) => {
    const container = {
      element: obj.element || "p",
      className: assignClassName(obj.attributes?.className)
    };
    const html = [];
    if (obj.heading && obj.heading.content) {
      const heading = {
        element: obj.heading?.element || "h2",
        className: assignClassName(obj.heading?.className),
        content: obj.heading?.content || false
      };
      html.push(`<${heading.element} ${heading.className}>${heading.content}</${heading.element}>`);
    }
    if (appData.pages.current.template === "collection" || appData.pages.current.template === "home") {
      const carCount = appData.pages.current.id === "home" ? appData.cars.overview.all : appData.cars.overview[appData.pages.current.id];
      html.push(`<${container.element} ${container.className}>${obj.content.replace('<strong id="countCollection"></strong>', `<strong id="countCollection">${carCount}</strong>`)}</${container.element}>`);
    } else {
      html.push(`<${container.element} ${container.className}>${obj.content}</${container.element}>`);
    }
    return assembleHTML(html);
  };
  var generateListEntry = (obj) => {
    const container = {
      element: obj.container?.element || "section",
      className: assignClassName(obj.container?.className)
    };
    const heading = {
      element: obj.heading?.element || "h3",
      className: assignClassName(obj.heading?.className),
      content: obj.heading?.content || false
    };
    const list = {
      element: obj.element,
      className: assignClassName(obj.attributes?.className)
    };
    const html = [];
    html.push(`<${container.element} ${container.className}>`);
    if (heading.content) {
      html.push(`<${heading.element} ${heading.className}>${heading.content}</${heading.element}>`);
    }
    html.push(`<${list.element} ${list.className}>`);
    obj.content.forEach((entry) => {
      html.push(`<li>${entry}</li>`);
    });
    html.push(`</${list.element}>`);
    html.push(`</${container.element}>`);
    return assembleHTML(html);
  };

  // src/lib/templates/home.js
  var templateHome = (data = appData.pages.current) => {
    const html = ["<main>"];
    const container = {
      element: data.content.container?.element || "section",
      className: assignClassName(data.content.container?.className)
    };
    html.push(`<${container.element} ${container.className}>`);
    html.push(`<h1>${data.h1}</h1>`);
    if (data.content.intro) {
      html.push(createIntroTemplate(data.content.intro));
    }
    html.push(searchBar_default("/all"));
    html.push(`</${container.element}>`);
    html.push(gridCars_default({ heading: { element: "h2", content: "Results" }, data: appData.cars.current }));
    html.push("</main>");
    return assembleHTML(html);
  };
  var home_default2 = templateHome;

  // src/lib/fragments/paginationControls.js
  var fragmentPaginationControls = (data) => {
    const html = `
  <nav aria-label="Pagination" class="fragmentPaginationControls">
    <ul>
      ${constructPrevButton(data)}
      ${constructPaginationLinks(data)}
      ${constructNextButton(data)}
    </ul>
  </nav>`;
    return html;
  };
  var paginationControls_default = fragmentPaginationControls;
  var getPageUrl = (page, slug) => {
    return page === 1 ? slug : `${slug}?page=${page}`;
  };
  var constructPrevButton = (data) => {
    const label = "&laquo; Previous page";
    if (data.page === 1) {
      return `<li class="disabled" aria-disabled="true"><a href="${getPageUrl(data.page, data.slug)}" aria-label="${label}">${label}</a></li>`;
    }
    return `<li><a href="${getPageUrl(data.page - 1, data.slug)}" aria-label="${label}">${label}</a></li>`;
  };
  var constructNextButton = (data) => {
    const label = "Next page &raquo;";
    if (data.page === data.total) {
      return `<li class="disabled" aria-disabled="true"><a href="${getPageUrl(data.page, data.slug)}" aria-label="${label}">${label}</a></li>`;
    }
    return `<li><a href="${getPageUrl(data.page + 1, data.slug)}" aria-label="${label}">${label}</a></li>`;
  };
  var constructPaginationLinks = (data) => {
    const entries = [];
    for (let i = 1; i <= data.total; i++) {
      if (i === data.page) {
        entries.push(
          `<li class="active" aria-disabled="true"><a aria-current="page" href="${getPageUrl(data.page, data.slug)}">${i}</a></li>`
        );
      } else {
        entries.push(
          `<li><a href="${getPageUrl(i, data.slug)}">${i}</a></li>`
        );
      }
    }
    return entries.join("");
  };

  // src/lib/templates/collection.js
  var templateCollection = ({ pagination, cars, pages: { current } } = appData) => {
    const paginatedCars = [...cars.current.slice(pagination.start, pagination.end)];
    const html = ["<main>"];
    const container = {
      element: current.content.container?.element || "section",
      className: assignClassName(current.content.container?.className)
    };
    html.push(`<${container.element} ${container.className}>`);
    if (pagination.page > 1) {
      html.push(`<h1>${current.h1} <span>- Page: ${pagination.page}</span></h1>`);
    } else {
      html.push(`<h1>${current.h1}</h1>`);
    }
    if (current.content.intro) {
      html.push(createIntroTemplate(current.content.intro));
    }
    html.push(searchBar_default(current.url.pathname));
    const heading = {
      element: "h2",
      content: appData.search.searchTerm ? "Search results" : "Results"
    };
    html.push(`</${container.element}>`);
    html.push(gridCars_default({ heading, data: paginatedCars }));
    if (pagination.total > 1) {
      html.push(paginationControls_default(pagination));
    }
    html.push("</main>");
    return assembleHTML(html);
  };
  var collection_default = templateCollection;

  // src/lib/fragments/fragmentContentCreators.js
  var generateAsideImageSection = (section) => {
    const container = {
      element: section.container?.element || "div",
      className: assignClassName(section.container?.attributes?.className)
    };
    const image = {
      element: section.image?.element || "picture",
      className: assignClassName(section.image?.attributes?.className),
      sources: section.image?.images || {}
    };
    const childrenWrapper = {
      element: section.children?.wrapper?.element || "div",
      className: section.children?.wrapper?.attributes?.className || ""
    };
    let html = [];
    html.push(`<${container.element} ${container.className}>`);
    html.push(`<${image.element} ${image.className}>`);
    html.push(`<source srcset="${image.sources.desktop}" media="(min-width: 500px)">`);
    html.push(`<source srcset="${image.sources.mobile}" media="(min-width: 0px)">`);
    html.push(`<img src="${image.sources.mobile}" alt="" width="16" height="9">`);
    html.push(`</${image.element}>`);
    html.push(`<${childrenWrapper.element} class="${childrenWrapper.className}">`);
    if (section.children?.entries) {
      section.children.entries.forEach((entry) => {
        if (entry.type === "text") {
          html.push(generateTextEntry(entry));
        } else if (entry.type === "list") {
          html.push(generateListEntry(entry));
        }
      });
    }
    html.push(`</${childrenWrapper.element}>`);
    html.push(`</${container.element}>`);
    return assembleHTML(html);
  };
  var generateTwoColumnWithImagesSection = (obj) => {
    const container = {
      element: obj.container?.element || "section",
      className: assignClassName(obj.container?.attributes?.className)
    };
    const wrapper = {
      element: obj.wrapper?.element || "div",
      className: assignClassName(obj.wrapper?.attributes?.className)
    };
    const html = [];
    const introHeading = {
      element: obj.intro.heading?.element || "h3",
      className: assignClassName(obj.intro?.heading?.className),
      content: obj.intro.heading.content || false
    };
    html.push(`<${container.element} ${container.className}>`);
    if (introHeading.content) {
      html.push(`<${introHeading.element} ${introHeading.className}>${introHeading.content}</${introHeading.element}>`);
    }
    html.push(generateTextEntry(obj.intro));
    html.push(`<${wrapper.element} ${wrapper.className}>`);
    const imgSrc = obj.imageColumn?.image?.src || "";
    const imgAlt = obj.imageColumn?.image?.alt || "";
    html.push(`<img src="${imgSrc}" alt="${imgAlt}" width="1" height="1">`);
    html.push("<div>");
    if (obj.contentColumn?.entries && Array.isArray(obj.contentColumn.entries)) {
      obj.contentColumn.entries.forEach((entry) => {
        switch (entry.type) {
          case "text":
            html.push(generateTextEntry(entry));
            break;
          case "list":
            html.push(generateListEntry(entry));
            break;
        }
      });
    }
    html.push("</div>");
    html.push(`</${wrapper.element}>`);
    html.push(`</${container.element}>`);
    return assembleHTML(html);
  };

  // src/lib/templates/content.js
  var templateContent = (data = appData.pages.current) => {
    const html = ["<main>"];
    const container = {
      element: data.content.container?.element || "section",
      className: assignClassName(data.content.container?.className)
    };
    html.push(`<${container.element} ${container.className}>`);
    html.push(`<h1>${data.h1}</h1>`);
    html.push(`<div class="contentLongFormContainer">`);
    if (data.content.intro) {
      html.push(createIntroTemplate(data.content.intro));
    }
    if (data.content.sections) {
      data.content.sections.forEach((section) => {
        switch (section.type) {
          case "asideImage":
            html.push(generateAsideImageSection(section));
            break;
          case "twoColumnWithImages":
            html.push(generateTwoColumnWithImagesSection(section));
            break;
        }
      });
    }
    html.push("</div>");
    html.push(`</${container.element}>`);
    html.push(`</main>`);
    return assembleHTML(html);
  };
  var content_default2 = templateContent;

  // src/lib/handlers/template.js
  var handleTemplate = async () => {
    try {
      const content3 = createPage2();
      headers = {
        "Content-Type": "text/html"
      };
      if (appData.options.noindex) {
        headers["x-robots-tag"] = "noindex";
      }
      return new Response(
        content3,
        {
          status: 200,
          headers
        }
      );
    } catch (error) {
      console.log("[Error]Handle template : ", error);
    }
  };
  var template_default2 = handleTemplate;
  var createPage2 = () => {
    const templates = {
      home: home_default2,
      collection: collection_default,
      content: content_default2
    };
    const sections = [
      documentHead_default2(),
      pageHead_default2(),
      pageBreadcrumbs_default2(),
      templates[appData.pages.current.template](),
      pageFooter_default2(),
      documentEnd_default2()
    ].join("");
    return sections;
  };

  // src/lib/handlers/request.js
  var handleRequest = async (request) => {
    const url2 = new URL(request.url);
    url2.searchParams = new URLSearchParams(url2.search);
    if (url2.pathname.startsWith("/images/") || url2.pathname.startsWith("/fonts/") || url2.pathname.startsWith("/api/")) {
      return static_default(url2);
    }
    switch (url2.pathname) {
      case "/robots.txt":
      case "/manifest.json":
      case "/sitemap.xml":
      case "/favicon.ico":
      case "/service-worker.js":
        return static_default(url2);
    }
    switch (request.method) {
      case "GET":
        return handleRequestHelperGet(request, url2);
      case "POST":
        return handleRequestHelperPost(request, url2);
    }
    return new Response("hi");
  };
  var request_default = handleRequest;
  var handleRequestHelperGet = async (request, url2) => {
    switch (url2.pathname) {
      case "/hotwheels":
      case "/matchbox":
      case "/other":
      case "/all":
      case "/duplicates":
        if (url2.searchParams.get("page") === "1") {
          url2.searchParams.delete("page");
          return new Response(null, { status: 308, headers: { Location: url2 } });
        }
        if (!url2.searchParams.get("page")) {
          url2.searchParams.set("page", 1);
        }
        if (appData.search) {
          appData.search.searchTerm = null;
        }
        await initAppData(url2);
        handleSearchTerm(url2);
        return template_default2();
    }
    await initAppData(url2);
    return template_default2();
  };
  var handleRequestHelperPost = async (request, url2) => {
    switch (url2.pathname) {
      case "/hotwheels":
      case "/matchbox":
      case "/other":
      case "/all":
      case "/duplicates":
        url2.searchParams.set("page", 1);
        url2.searchParams.set("q", await extractQuery(request));
        await initAppData(url2);
        handleSearchTerm(url2);
        return template_default2();
    }
    return new Response("[Error] 404 - request.js");
  };
  var extractQuery = async (request) => {
    const formObject = await request.formData();
    return formObject.get("q");
  };
  var handleSearchTerm = async (url2) => {
    const searchTerm = url2.searchParams.get("q");
    if (searchTerm) {
      appData.search.searchTerm = searchTerm;
      const additionalContent = {
        type: "text",
        element: "p",
        attributes: {
          className: "searchText"
        },
        content: `You have searched for <em>'${searchTerm}'</em>. There ${appData.cars.current.length === 1 ? `is` : `are`} <strong>${appData.cars.current.length}</strong> result${appData.cars.current.length === 1 ? `` : `s`}.`
      };
      appData.pages.current.content.intro.entries.push(additionalContent);
    }
  };

  // src/index.js
  addEventListener("fetch", (event) => {
    const url2 = new URL(event.request.url);
    if (url2.pathname.startsWith("/admin")) {
      event.respondWith(indexAdmin_default(event.request));
    } else {
      event.respondWith(request_default(event.request));
    }
  });
})();
//# sourceMappingURL=index.js.map
