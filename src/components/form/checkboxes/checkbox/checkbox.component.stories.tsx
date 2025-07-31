import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox.component.tsx';
import { action } from 'storybook/actions';
import type { CheckboxProps } from './checkbox.props.ts';
import { Field } from '../../../common/field/field.component.tsx';
import { useState } from 'react';
import type { CheckboxChangeEvent } from '../checkboxes.interfaces.ts';
import { Label } from '../../../common/label/label.component.tsx';

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  args: {
    onChange: action('onChange'),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  const [partial, setPartial] = useState(false);

  const onCheckboxChange = (event?: CheckboxChangeEvent) => {
    setChecked(event?.checked ?? false);
    setPartial(false);
  };

  const svgStyles =
    'bsh:stroke-white bsh:opacity-0 bsh:size-[21px] bsh:bg-blue-500 bsh:group-data-checked:opacity-100 bsh:group-data-partial:opacity-100 bsh:stroke-2 bsh:[stroke-linecap:round] bsh:[stroke-linejoin:round]';

  return (
    <div className="bsh:flex bsh:flex-col">
      <div>
        <button onClick={() => setPartial(true)}>Set Partial</button>
      </div>
      <Field className="bsh:flex bsh:flex-row bsh:items-center">
        <Checkbox
          checked={checked}
          partial={partial}
          className="bsh:group"
          {...args}
          onChange={onCheckboxChange}
        >
          <svg
            viewBox="0 0 21 21"
            className={svgStyles}
          >
            <polyline
              className="bsh:[visibility:hidden] bsh:group-data-checked:visible"
              points="5 10.75 8.5 14.25 16 6"
            />
            <polyline className="bsh:[visibility:hidden] bsh:group-data-partial:visible" points="6 10.5 16 10.5" />
          </svg>
        </Checkbox>
        <Label className="bsh:hover:cursor-pointer">Test Checkbox</Label>
      </Field>
    </div>
  );
};

export const Default: Story = {
  args: {
    name: 'test',
  },
  render: (args) => <Template {...args} />,
};

export const ReadOnly: Story = {
  args: {
    name: 'test',
    checked: true,
    readOnly: true,
  },
  render: (args) => <Template {...args} />,
};
