# @nimbus-ds/segmented-control

A segmented control component for the Nimbus Design System.

## Installation

```sh
yarn add @nimbus-ds/segmented-control
```

## Usage

```jsx
import { SegmentedControl } from "@nimbus-ds/segmented-control";

// Uncontrolled usage with Button/Item pattern
const UncontrolledExample = () => (
  <SegmentedControl>
    <SegmentedControl.Button 
      label="First" 
      index={0} 
      setActiveSegment={handleTabChange}
    />
    <SegmentedControl.Item label="First">
      First tab content
    </SegmentedControl.Item>
    
    <SegmentedControl.Button 
      label="Second" 
      index={1} 
      setActiveSegment={handleTabChange}
    />
    <SegmentedControl.Item label="Second">
      Second tab content
    </SegmentedControl.Item>
  </SegmentedControl>
);

// Controlled usage
const ControlledExample = () => {
  const [selected, setSelected] = useState(0);
  
  return (
    <SegmentedControl 
      selected={selected}
      onSegmentSelect={setSelected}
    >
      <SegmentedControl.Button 
        label="Option 1" 
        index={0}
        setActiveSegment={setSelected}
      />
      <SegmentedControl.Item label="Option 1">
        First option content
      </SegmentedControl.Item>
      
      <SegmentedControl.Button 
        label="Option 2" 
        index={1}
        setActiveSegment={setSelected}
      />
      <SegmentedControl.Item label="Option 2">
        Second option content
      </SegmentedControl.Item>
    </SegmentedControl>
  );
};

// Loading state
const LoadingExample = () => (
  <SegmentedControl.Button.Skeleton />
);
```

## Properties

### SegmentedControl
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| children | ReactNode[] | - | The content of the segmented control (Buttons and Items) |
| preSelectedSegment | number | 0 | The pre-selected segment index for uncontrolled mode |
| selected | number | - | The selected segment index for controlled mode |
| onSegmentSelect | function | - | Callback when a segment is selected (for controlled mode) |
| fullWidth | boolean | false | Whether the segmented control spans full width |

### SegmentedControl.Button
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| label | string | - | Label text for the button (required) |
| index | number | - | Position of the button (required) |
| setActiveSegment | function | - | Callback when the button is clicked (required) |
| active | boolean | false | Whether the button is selected |
| disabled | boolean | false | Whether the button is disabled |
| fullWidth | boolean | false | Whether the button spans full width |

### SegmentedControl.Item
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| label | string | - | Label to match with the corresponding button (required) |
| children | ReactNode | - | Content to show when the tab is selected |

## License

MIT 