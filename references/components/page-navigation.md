# page-navigation

Page navigation/header region. Wraps `radix:navbar` with configurable container type, color theme, and left/right placement.

## Props

The component is a thin wrapper around `radix:navbar` — refer to [navbar.md](navbar.md) for the underlying prop list. The docs don't enumerate a separate prop schema for this wrapper.

## Slots

- Navbar left section — typically brand, primary nav
- Navbar right section — typically user menu, search

## Example

```twig
{% include 'radix:page-navigation' %}
```

## Gotchas

- Acts as a thin wrapper around `radix:navbar` — for customization, refer to the `radix:navbar` props (container type, color theme, expand breakpoint, etc.).
- The shipped `page-navigation.twig` defines how the navbar is composed in your subtheme; override it to change the default header structure.

## Underlying Bootstrap

Bootstrap 5.3 Navbar — https://getbootstrap.com/docs/5.3/components/navbar/
