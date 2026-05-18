# nav-item

Single nav-item building block intended for use inside `radix:nav` or `radix:navbar` to render an individual `.nav-item` / `.nav-link`.

## Props

The public docs page does not enumerate props or slots for this component. Read `web/themes/contrib/radix/components/nav-item/nav-item.component.yml` and `nav-item.twig` to see the actual contract for your installed Radix version.

## Slots

None documented.

## Example

```twig
{% include 'radix:nav-item' %}
```

## Gotchas

- This is a low-level building block usually composed inside `radix:nav` or `radix:navbar` rather than used standalone.
- To discover the real API, inspect the component source directly:
  ```bash
  cat web/themes/contrib/radix/components/nav-item/nav-item.component.yml
  cat web/themes/contrib/radix/components/nav-item/nav-item.twig
  ```
- Or query the docs LLM: `WebFetch https://docs.trydrupal.com/radix/components/nav-item.md?ask=what props and slots does this component accept`.

## Underlying Bootstrap

Bootstrap 5.3 Navs & tabs / Nav item — https://getbootstrap.com/docs/5.3/components/navs-tabs/
