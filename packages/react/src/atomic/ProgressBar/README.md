# `@nimbus-ds/progress-bar`

[![@nimbus-ds/progress-bar](https://img.shields.io/npm/v/@nimbus-ds/progress-bar?label=%40nimbus-ds%2Fprogress-bar)](https://www.npmjs.com/package/@nimbus-ds/progress-bar)

The ProgressBar component is used to display the progress of an operation or task in a visual format.

## Installation

```sh
$ yarn add @nimbus-ds/progress-bar
# or
$ npm install @nimbus-ds/progress-bar
```

### Component Anatomy

The component consists of a horizontal bar with a fill that represents the progress value as a percentage from 0 to 100.

## Guidelines

We use the ProgressBar component to visually communicate the completion status of operations, tasks, or any measurable progress.

### Variants

The component has 5 appearance variants that can be used according to the context:

- **Neutral** - Used for general progress indication without specific semantic meaning
- **Primary** - Used to highlight important progress or main tasks  
- **Success** - Used to indicate positive progress or successful completion stages
- **Warning** - Used to indicate caution or attention-required progress
- **Danger** - Used to indicate critical or error-related progress

### Usage recommendations

- Use to show completion percentage of tasks, uploads, downloads, or any measurable operation
- Ensure the progress value is meaningful and accurately represents the actual completion state
- Consider adding text labels to provide additional context when necessary
- Use appropriate appearance variants to convey the semantic meaning of the progress

### Accessibility

The component includes proper ARIA attributes:
- `role="progressbar"` to identify the element as a progress indicator
- `aria-valuenow` to indicate the current progress value
- `aria-valuemin` and `aria-valuemax` to define the range (0-100)

## Usage

View docs [here](https://nimbus.nuvemshop.com.br/documentation/atomic-components/progress-bar).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" /> 
