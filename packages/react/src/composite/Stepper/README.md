# `@nimbus-ds/stepper`

[![@nimbus-ds/stepper](https://img.shields.io/npm/v/@nimbus-ds/stepper?label=%40nimbus-ds%2Fstepper)](https://www.npmjs.com/package/@nimbus-ds/stepper)

The Stepper component guides users through multi-step processes, showing their progress and allowing navigation between completed steps.

## Installation

```sh
$ yarn add @nimbus-ds/stepper
# or
$ npm install @nimbus-ds/stepper
```

### Component Anatomy

The component consists of circular step indicators connected by lines, with optional labels. Each step can be in one of three states: completed, active, or upcoming.

## Guidelines

We use the Stepper component to break down complex processes into manageable steps, providing clear visual feedback about progress and allowing users to understand where they are in the workflow.

### Structure

The Stepper component consists of:

- **Stepper** - The main container that manages step state and navigation
- **Stepper.Item** - Individual step indicators with optional labels
- **Stepper.Card** - Optional wrapper that provides a card-style container

### Step States

Each step has a visual state that communicates its status:

- **Completed** - Steps that have been finished (checkmark icon)
- **Active** - The current step being worked on (highlighted)
- **Upcoming** - Steps that haven't been reached yet (numbered)

### Control Modes

The component supports both controlled and uncontrolled modes:

- **Controlled** - You manage the selected step state externally via `selectedStep` and `onSelectStep` props
- **Uncontrolled** - The component manages its own selected step state internally

### Navigation

Users can click on completed steps to navigate back, but cannot jump ahead to future steps. This maintains the integrity of the step-by-step process.

### Mobile Considerations

On mobile devices, labels can be hidden to save space, showing only the step indicators with numbers or icons.

### Usage Recommendations

- Guide users through multi-step forms or wizards
- Show progress in onboarding flows
- Break down complex processes into digestible steps
- Indicate current position in checkout or setup flows

### Content Guidelines

- Keep step labels short and descriptive (1-2 words)
- Use clear, action-oriented language
- Maintain consistent terminology throughout the process
- Ensure labels accurately reflect the step content

## Usage

```jsx
// Basic uncontrolled usage
<Stepper activeStep={2}>
  <Stepper.Item label="Setup" />
  <Stepper.Item label="Configuration" />
  <Stepper.Item label="Review" />
  <Stepper.Item label="Deploy" />
</Stepper>

// Controlled usage with navigation
<Stepper 
  activeStep={activeStep}
  selectedStep={selectedStep}
  onSelectStep={setSelectedStep}
>
  <Stepper.Item label="Select audience" />
  <Stepper.Item label="Create content" />
  <Stepper.Item label="Define budget" />
  <Stepper.Item label="Review" />
  <Stepper.Item label="Publish" />
</Stepper>

// With card wrapper
<Stepper.Card>
  <Stepper activeStep={1}>
    <Stepper.Item label="Start" />
    <Stepper.Item label="Process" />
    <Stepper.Item label="Finish" />
  </Stepper>
</Stepper.Card>

// Mobile-friendly (without labels)
<Stepper activeStep={0}>
  <Stepper.Item />
  <Stepper.Item />
  <Stepper.Item />
</Stepper>
```

### Props

#### Stepper

- `activeStep` (number): The currently active step (0-based index)
- `selectedStep` (number, optional): The currently selected step for controlled mode
- `onSelectStep` (function, optional): Callback for step selection in controlled mode
- `children` (ReactNode): StepperItem components

#### Stepper.Item

- `label` (string, optional): Text label for the step
- `step` (number): Step number (automatically assigned by parent)

View docs [here](https://nimbus.nuvemshop.com.br/documentation/composite-components/stepper).

<img alt="Nimbus" style="margin-bottom: 30px;" src="https://tiendanube.github.io/design-system-nimbus/static/media/nimbus-logo.ab60bd79.png" height="30" />
