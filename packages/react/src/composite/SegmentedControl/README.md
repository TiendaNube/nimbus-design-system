# @nimbus-ds/segmented-control

A segmented control component for the Nimbus Design System.

## Installation

```sh
yarn add @nimbus-ds/segmented-control
```

## Usage

```jsx
import { SegmentedControl } from "@nimbus-ds/segmented-control";

// Basic uncontrolled usage
const BasicExample = () => (
  <SegmentedControl>
    {["First", "Second", "Third"].map((name) => (
      <SegmentedControl.Button key={name} label={name}>
        {name}
      </SegmentedControl.Button>
    ))}
  </SegmentedControl>
);

// Controlled usage
const ControlledExample = () => {
  const [selectedSegments, setSelectedSegments] = useState([0]);
  
  return (
    <SegmentedControl 
      selectedSegments={selectedSegments}
      onSegmentsSelect={setSelectedSegments}
    >
      {["Option 1", "Option 2", "Option 3"].map((name, index) => (
        <SegmentedControl.Button 
          key={name} 
          label={name}
        >
          {name}
        </SegmentedControl.Button>
      ))}
    </SegmentedControl>
  );
};

// With fullWidth property
const FullWidthExample = () => (
  <SegmentedControl fullWidth>
    {["First", "Second", "Third"].map((name) => (
      <SegmentedControl.Button key={name} label={name}>
        {name}
      </SegmentedControl.Button>
    ))}
  </SegmentedControl>
);

// Loading state
const LoadingExample = () => (
  <SegmentedControl.Button.Skeleton />
);
```

View docs [here](https://nimbus.nuvemshop.com.br/documentation/composite-components/segmented-control).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />