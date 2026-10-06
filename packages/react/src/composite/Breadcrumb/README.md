# @nimbus-ds/breadcrumb

The Breadcrumb component shows where the current page sits in a multi-level hierarchy, from the root to the current page, and lets users go back to any ancestor. Long paths collapse their middle levels into a panel opened from an ellipsis button.

## Installation

```bash
npm install @nimbus-ds/breadcrumb
# or
yarn add @nimbus-ds/breadcrumb
```

## Usage

```jsx
import { Breadcrumb } from "@nimbus-ds/breadcrumb";

const App = () => (
  <Breadcrumb
    items={[
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Shirts", href: "/products/shirts" },
      { label: "Blue shirt" },
    ]}
  />
);
```

To render links through a router, pass a component that renders a native anchor with the received attributes:

```jsx
<Breadcrumb items={items} linkAs={RouterLink} />
```

## Documentation

Check the documentation at [nimbus.nuvemshop.com.br](https://nimbus.nuvemshop.com.br/documentation).
