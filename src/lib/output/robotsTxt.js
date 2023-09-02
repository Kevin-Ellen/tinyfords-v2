// src > lib > output > robotsTxt.js

const outputRobotsTxt = (url) => {
  return new Response(robotstxtcontent(url), {status: 200});
}
  
export default outputRobotsTxt;
  
const robotstxtcontent =  (url) => `# Hello!
user-agent: *
allow: /
  
sitemap: ${url.protocol}//${url.host}/sitemap.xml
`;