# SentinelGel

A Conrad Challenge (Health & Nutrition) concept: a drinkable throat coating that turns into a sticky gel at body temperature and releases a buffer only when acid reflux hits.

## The idea

- **Layer 1, the shield:** a poloxamer 407 thermogel with catechol–hyaluronic acid. It is liquid at room temperature, gels at 37 °C and sticks to the throat and esophagus.
- **Layer 2, the responders:** chitosan–alginate microspheres loaded with Mg(OH)₂. They stay closed at normal saliva pH and swell open below about pH 5.
- **The twist:** chitosan gains positive charge in acid, so the beads also stick harder to mucus at the moment of attack.

## Website

A static site with no build step. Open `index.html` in a browser, or turn on GitHub Pages (Settings → Pages → deploy from the `main` branch).

| File | Page |
| --- | --- |
| `index.html` | Home: the problem, the five demands, how it works, the pH demo |
| `innovation.html` | Description |
| `science.html` | Formulation and comparison |
| `testing.html` | Test plan, open questions, safety |
| `impact.html` | Intended impact |
| `assets/site.css` | All styles and design tokens |
| `assets/site.js` | Navigation, footer, scroll effects, pH demo |

The navigation and footer are defined once, in `assets/site.js` (`NAV` at the top of the file).

### Still to fill in

- Hero photograph (optional). The home page opens on an illustration. To use a team photo instead, save it as `assets/hero.jpg` and add `style="--hero-photo: url(assets/hero.jpg)"` to the `<header class="hero">` tag in `index.html`.

## Credits

The site's layout system is adapted from the [GEMS Taiwan iGEM 2026 wiki](https://2026.igem.wiki/gems-taiwan/) ([source](https://gitlab.igem.org/2026/gems-taiwan)), shared under CC BY 4.0. Palette, figures and content are SentinelGel's own.

## Status

Student concept in development. Not a medical product or medical advice.
