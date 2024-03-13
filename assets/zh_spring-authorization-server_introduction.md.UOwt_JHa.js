import{_ as e,c as t,o as r,a4 as a}from"./chunks/framework.1byOzfxP.js";const o="/assets/20240223134352.r3brdyGX.png",i="/assets/20240223141447.celR51WU.png",n="/assets/20240223142259.tf_jVqlc.png",h="/assets/20240223142530.QUK-7ttb.png",b=JSON.parse('{"title":"初识SpringAuthorizationServer和OAuth2.1协议","description":"","frontmatter":{},"headers":[],"relativePath":"zh/spring-authorization-server/introduction.md","filePath":"zh/spring-authorization-server/introduction.md","lastUpdated":1708670063000}'),l={name:"zh/spring-authorization-server/introduction.md"},s=a('<h1 id="初识springauthorizationserver和oauth2-1协议" tabindex="-1">初识SpringAuthorizationServer和OAuth2.1协议 <a class="header-anchor" href="#初识springauthorizationserver和oauth2-1协议" aria-label="Permalink to &quot;初识SpringAuthorizationServer和OAuth2.1协议&quot;">​</a></h1><h2 id="什么是oauth2-1" tabindex="-1">什么是OAuth2.1？ <a class="header-anchor" href="#什么是oauth2-1" aria-label="Permalink to &quot;什么是OAuth2.1？&quot;">​</a></h2><p>经过近些年网络和设备的不断发展，之前的oauth2.0发布的授权协议标准已经远远不能满足现在的场景和需求，根据其安全最佳实践，在oauth2.0的基础上移除了一些不安全的授权方式，并且对扩展协议进行整合。该协议定义了一系列关于授权的开放网络标准，允许用户授权第三方应用访问他们存储在另外的服务提供者上的信息。现在各三方平台提供的授权登录基本都是基于oauth协议的，例如微信、QQ、GitHub和Gitee等平台提供的授权登录。而Spring Security的团队也在社区的推动下推出了基于oauth2.1协议的授权框架：Spring Authorization Server。</p><h2 id="什么是spring-authorization-server" tabindex="-1">什么是Spring Authorization Server？ <a class="header-anchor" href="#什么是spring-authorization-server" aria-label="Permalink to &quot;什么是Spring Authorization Server？&quot;">​</a></h2><p>Spring authorization server是由社区推动的一个项目，在Spring security团队的领导下基于<a href="https://connect2id.com/products/nimbus-oauth-openid-connect-sdk" target="_blank" rel="noreferrer">Nimbus</a>库重头编写，其目的主要是为 Spring 社区提供 OAuth 2.0 授权服务器支持，替代已被废弃的Spring Security OAuth框架。Spring authorization server提供了OAuth 2.1和OpenID Connect 1.0规范以及其他相关规范的实现。</p><h2 id="spring-authorization-server根据oauth2-1规范实现的特性列表" tabindex="-1">Spring Authorization Server根据oauth2.1规范实现的特性列表 <a class="header-anchor" href="#spring-authorization-server根据oauth2-1规范实现的特性列表" aria-label="Permalink to &quot;Spring Authorization Server根据oauth2.1规范实现的特性列表&quot;">​</a></h2><p>在列出特性时也会根据特性说明该特性对应的oauth2.1规范。</p><h3 id="认证功能列表" tabindex="-1">认证功能列表 <a class="header-anchor" href="#认证功能列表" aria-label="Permalink to &quot;认证功能列表&quot;">​</a></h3><p>角色解释(摘抄自oauth2.1规范文档 <a href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#name-roles" target="_blank" rel="noreferrer">Roles</a>)</p><ol><li>Resource Owner：资源拥有者；能够授予对受保护资源的访问权限的实体，通常指的是终端用户。</li><li>Client：客户端；代表资源所有者发出受保护资源请求并获得其授权的应用程序。</li><li>Authorization Server：认证服务器；服务器在成功对资源所有者进行身份验证并获得授权后向客户端发出访问令牌。</li><li>Resource Server：资源服务器；托管受保护资源的服务器，能够使用访问令牌接受和响应受保护的资源请求。</li></ol><h4 id="授权码模式" tabindex="-1">授权码模式 <a class="header-anchor" href="#授权码模式" aria-label="Permalink to &quot;授权码模式&quot;">​</a></h4><p>授权码模式（Authorization Code Grant）是功能最完整、流程最严密的授权模式。它的特点就是通过客户端的后台服务器，与&quot;服务提供商&quot;的认证服务器进行互动；</p><p>流程如下</p><p><img src="'+o+'" alt="Authorization Grant" loading="lazy"></p><p>更详细内容请查看规范中关于授权码模式的介绍：<a href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#section-4.1" target="_blank" rel="noreferrer">4.1. </a><a href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#name-authorization-code-grant" target="_blank" rel="noreferrer">Authorization Code Grant</a></p><h4 id="授权码扩展流程pkce-proof-key-for-code-exchange" tabindex="-1">授权码扩展流程PKCE(Proof Key for Code Exchange) <a class="header-anchor" href="#授权码扩展流程pkce-proof-key-for-code-exchange" aria-label="Permalink to &quot;授权码扩展流程PKCE(Proof Key for Code Exchange)&quot;">​</a></h4><p>使用授权码授予的OAuth 2.0公共客户端是易受授权码拦截攻击。该流程可以减轻攻击，通过使用代码交换证明密钥来抵御威胁。客户端生成code_verifier和code_challenge跟认证服务器进行交互，以生成的随机认证码进行身份认证。</p><p><img src="'+i+'" alt="Abstract Protocol Flow" loading="lazy"></p><p>更详细内容请查看规范中关于PKCE的介绍： <a href="https://datatracker.ietf.org/doc/html/rfc7636" target="_blank" rel="noreferrer">rfc7636</a></p><h4 id="客户端模式" tabindex="-1">客户端模式 <a class="header-anchor" href="#客户端模式" aria-label="Permalink to &quot;客户端模式&quot;">​</a></h4><p>客户端模式（Client Credentials Grant）指客户端以自己的名义，而不是以用户的名义，向&quot;服务提供商&quot;进行认证。严格地说，客户端模式并不属于OAuth框架所要解决的问题。在这种模式中，用户直接向客户端注册，客户端以自己的名义要求&quot;服务提供商&quot;提供服务，其实不存在授权问题；流程如下</p><p><img src="'+n+'" alt="Client Credentials Grant" loading="lazy"></p><p>更详细内容请查看规范中关于客户端模式的介绍：<a href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#section-4.2" target="_blank" rel="noreferrer">4.2. </a><a href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-10#name-client-credentials-grant" target="_blank" rel="noreferrer">Client Credentials Grant</a></p><h4 id="设备授权码模式" tabindex="-1">设备授权码模式 <a class="header-anchor" href="#设备授权码模式" aria-label="Permalink to &quot;设备授权码模式&quot;">​</a></h4><p>设备授权码模式（Device Authorization Grant）主要会出现在凭证式授权类型中，为设备代码，设备流中无浏览器或输入受限的设备提供的一种认证方式，设备会让用户在另一台设备上的浏览器中访问一个网页，以进行登录。 用户登录后，设备可以获取所需的访问令牌和刷新令牌；流程如下</p><p><img src="'+h+'" alt="Device Authorization Flow" loading="lazy"></p><p>更详细内容请查看规范中关于设备授权码模式的介绍：<a href="https://datatracker.ietf.org/doc/html/rfc8628" target="_blank" rel="noreferrer">rfc8628</a></p><h4 id="刷新access-token" tabindex="-1">刷新access token <a class="header-anchor" href="#刷新access-token" aria-label="Permalink to &quot;刷新access token&quot;">​</a></h4><p>刷新令牌在获取access token时会同步获取刷新令牌(Refresh token)，如果用户访问的时候，客户端的&quot;访问令牌&quot;已经过期，则需要使用&quot;更新令牌(Refresh token)&quot;申请一个新的访问令牌。</p><div class="warning custom-block"><p class="custom-block-title">注意</p><p>oauth2.1移除了隐式授权模式(Implicit grant)和密码模式(Resource Owner Password Credentials Grant)。详见oauth2.1规范中提到的“<a href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-00#name-differences-from-oauth-20" target="_blank" rel="noreferrer">与oauth2.0的区别</a>”和oauth2.0规范中对于“<a href="https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics#name-resource-owner-password-cre" target="_blank" rel="noreferrer">密码模式</a>”的描述：<em>The resource owner password credentials grant MUST NOT be used.</em></p></div><h3 id="token生成" tabindex="-1">Token生成 <a class="header-anchor" href="#token生成" aria-label="Permalink to &quot;Token生成&quot;">​</a></h3><ul><li><p>令牌生成器</p><p>框架提供了令牌生成器（OAuth2TokenGenerator），负责从提供的OAuth2TokenContext中根据TokenType类型生成对应的OAuth2Token，tokenGenerator很灵活，它可以支持access_token和refresh_token的任何自定义令牌格式。</p></li><li><p>JWT <a href="https://tools.ietf.org/html/rfc7519" target="_blank" rel="noreferrer">RFC 7519</a></p></li><li><p>JWS <a href="https://tools.ietf.org/html/rfc7515" target="_blank" rel="noreferrer">RFC 7515</a></p></li></ul><h3 id="客户端认证方式" tabindex="-1">客户端认证方式 <a class="header-anchor" href="#客户端认证方式" aria-label="Permalink to &quot;客户端认证方式&quot;">​</a></h3><ul><li><p><strong>client_secret_basic</strong></p><p>客户端将clientId 和 clientSecret 通过 ‘:’ 号拼接，并使用 Base64 进行编码得到一个字符串。将此编码字符串放到请求头(Authorization)去发送请求。授权服务器通过获取请求头中的clientId和clientSecret对客户端进行认证。</p></li><li><p><strong>client_secret_post</strong></p><p>客户端将 clientId 和 clientSecret 放到请求体(表单)去发送请求。授权服务器获取请求参数中的clientId和clientSecret对客户端进行认证。</p></li><li><p><strong>client_secret_jwt</strong></p><p>client_secret_jwt方式就是利用 JWT 进行认证。请求方和授权服务器，两者都知道客户端的 client_secret，通过相同的 HMAC 算法（对称签名算法）去加签和验签 JWT ，可以达到客户端认证的目的。请求方通过HMAC算法，以 client_secret 作为密钥，将客户端信息加签生成 JWT；授权服务器使用相同的HMAC算法和client_secret，对请求方的 JWT 进行验签以认证客户端。</p></li><li><p><strong>private_key_jwt</strong></p><p>private_key_jwt 方式就是利用 JWT 进行认证；请求方拥有自己的公私钥（密钥对），使用私钥对 JWT 加签，并将公钥暴露给授权服务器；授权服务器通过请求方的公钥验证 JWT，也能达到客户端认证的目的。请求方维护了一对公私钥，通过 RSA算法，使用私钥将客户端信息加签生成 JWT；另外还通过接口暴露公钥给授权服务器；授权服务器使用请求方的公钥对请求方的 JWT进行验签以认证客户端。</p></li><li><p><strong>none (public clients)</strong></p><p>当客户端是公共客户端时认证服务器不会对客户端进行验证，PKCE(Proof Key for Code Exchange)流程要求客户端为公共客户端。</p></li></ul><h3 id="认证服务器端点" tabindex="-1">认证服务器端点 <a class="header-anchor" href="#认证服务器端点" aria-label="Permalink to &quot;认证服务器端点&quot;">​</a></h3><p>包含OAuth2.1和Open Connect 1.0相关端点，详见官网对于<a href="https://docs.spring.io/spring-authorization-server/reference/overview.html" target="_blank" rel="noreferrer">端点</a>的介绍文档</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>本篇文章只是一个引子，很多地方说的很简单，大概了解了一些关于spring Authorization Server和oauth协议的相关内容，如果对某个点感兴趣可以针对性的去读一些相关的文章。</p>',38),c=[s];function p(u,d,f,g,_,k){return r(),t("div",null,c)}const v=e(l,[["render",p]]);export{b as __pageData,v as default};
