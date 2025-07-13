import { Toggle } from './toggle.component.tsx';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import type { ToggleProps } from './toggle.props.ts';
import { useState } from 'react';
import type { CheckboxChangeEvent } from '../checkboxes.interfaces.ts';
import { Field } from '../../../common/field/field.component.tsx';
import { Label } from '../../../common/label/label.component.tsx';

const meta = {
  title: 'Form/Toggle',
  component: Toggle,
  args: {
    onChange: action('onChange'),
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: ToggleProps) => {
  const [toggled, setToggled] = useState(false);

  const onToggleChanged = (event?: CheckboxChangeEvent) => {
    setToggled(event?.checked ?? false);
  };

  return (
    <Field className="bsh:flex bsh:flex-col">
      <Label className="bsh:hover:cursor-pointer">Test Toggle</Label>
      <Toggle
        toggled={toggled}
        className="bsh:group bsh:relative bsh:flex bsh:border bsh:border-black bsh:bg-white bsh:h-7 bsh:w-14 bsh:cursor-pointer bsh:rounded-full bsh:p-1 bsh:ease-in-out"
        {...args}
        onChange={onToggleChanged}
      >
        <span
          className="bsh:pointer-events-none bsh:inline-block bsh:bg-blue-500 bsh:size-5 bsh:translate-x-0 bsh:rounded-full bsh:transition bsh:duration-200 bsh:ease-in-out bsh:group-data-toggled:translate-x-7"
        />
      </Toggle>
    </Field>
  );
};

export const Default: Story = {
  args: {
    name: 'test',
  },
  render: (args) => <Template {...args} />,
};
