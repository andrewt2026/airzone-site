# Air Zone Experts — Astro site (AWS Amplify)

Static rebuild of airzoneexperts.com (formerly WordPress + Divi on Pressable).
Every URL, title, meta description, canonical, OG tag and H1 matches the live site.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs static site to dist/
```

## Structure

```
src/
  layouts/BaseLayout.astro     page shell: SEO tags, header, footer, scripts
  components/
    Header.astro               top bar + main nav (active state auto from URL)
    Footer.astro               footer
    FooterForm.astro           footer contact form (2-step)
    ContactPageForm.astro      /contact-hvac-installer/ form (2-step)
    SiteHead.astro             shared CSS/fonts/jQuery/GA
    SiteScripts.astro          shared Divi + plugin JS
  pages/
    [city].astro               ONE template for all 12 city pages
    *.astro                    every other page (content is the original Divi markup)
  data/cities/*.json           per-city copy, FAQs, map, hero image, SEO
public/
  wp-content/…                 all images/CSS/JS at their original paths
  css/site/, css/pages/        extracted Divi styles (shared / per page)
```

## Editing

- **City page copy:** edit `src/data/cities/<city>.json`. Fields: hero, intro, AC/heating cards,
  serving + fun fact, map embed, reviews, FAQs (4 groups), contact, SEO.
- **Add a city:** copy a JSON file, rename it to the new slug (e.g. `frisco-tx.json`), set `"slug"`, rewrite
  the copy. It is built automatically and added to the sitemap. Add a link under *Areas We Serve* in `Header.astro`.
- **City FAQ schema:** FAQPage JSON-LD is generated automatically from each city's FAQs.
- **Other pages:** edit the markup in `src/pages/<slug>.astro`; SEO fields are in the `seo` object at the top.

## Deploy to AWS Amplify

1. Push this folder to a GitHub/GitLab/Bitbucket repo (`node_modules/` and `dist/` are git-ignored).
2. Amplify console → **Create new app** → connect the repo. `amplify.yml` is picked up automatically.
3. **Environment variables:** add `PUBLIC_FORM_ENDPOINT` = your form backend URL (see Forms).
4. **Rewrites and redirects** → *Manage redirects* → *Open text editor* → paste `amplify-redirects.json`.
5. **Custom domains:** add airzoneexperts.com + www, then update DNS when ready to cut over.

No-Git option: run `npm run build` and drag the `dist` folder (zipped) into Amplify's *Deploy without Git*.

## Forms

Gravity Forms is gone. Both forms POST standard form data (JSON response expected) to
`PUBLIC_FORM_ENDPOINT`. Field names: `first_name, last_name, email, phone, street_address, city,
state, zip, service, project_type, status, message, mailing_list, form_name`.
Any backend that accepts a POST works: Formspree, Web3Forms, Basin, or API Gateway + Lambda + SES.
The 2-step Next/Previous flow and validation run client-side.

## Notes from the migration

- Redirects carried over from the live site (`amplify-redirects.json`). Two live redirects pointed at the
  staging domain (`air-zone-experts.mystagingwebsite.com`); here they go to `/heating-service/` and
  `/contact-hvac-installer/`. Export Rank Math → Redirections from WordPress for any others before cutover.
- The "Recent HVAC Projects" block (azx-recent-projects plugin) is now static HTML in each city JSON
  (`projectsHtml`; only Addison currently has projects).
- Trustindex reviews, Google Maps, Google Analytics (G-W4S6075S5C) and Typekit still load from their CDNs.
- Sitemap: `/sitemap-index.xml` (old Rank Math sitemap URLs 301 to it). Resubmit in Search Console.
