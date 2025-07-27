import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxGroup } from './checkbox-group.component.tsx';
import { action } from 'storybook/actions';
import type { CheckboxGroupChangeEvent, CheckboxGroupProps } from './checkbox-group.props.ts';
import { Checkbox } from '../checkbox/checkbox.component.tsx';
import { Label } from '../../../common/label/label.component.tsx';
import { Field } from '../../../common/field/field.component.tsx';

const meta = {
  title: 'Form/Checkbox Group',
  component: CheckboxGroup,
  args: {
    onChange: action('onChange'),
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

interface TestData {
  value: string;
  text: string;
}

const data: Array<TestData> = [
  { value: 'item1', text: 'Item 1' },
  { value: 'item2', text: 'Item 2' },
  { value: 'item3', text: 'Item 3' },
  { value: 'item4', text: 'Item 4' },
];

const Template = (args: CheckboxGroupProps<TestData>) => {
  // @ts-expect-error can't figure out why this is throwing an error
  const [selected, setSelected] = useState<Array<TestData>>([data[0], data[2]]);

  const handleOnChange = (event?: CheckboxGroupChangeEvent) => {
    if (event) {
      setSelected(event.value as Array<TestData>);
      args.onChange?.(event);
    }
  };

  const svgStyles =
    'bsh:stroke-white bsh:opacity-0 bsh:size-[21px] bsh:bg-blue-500 bsh:group-data-checked:opacity-100 bsh:group-data-partial:opacity-100 bsh:stroke-2 bsh:[stroke-linecap:round] bsh:[stroke-linejoin:round]';

  return (
    <div className="bsh:w-full">
      <CheckboxGroup
        name="test"
        value={selected}
        readOnly={args.readOnly}
        comparator="value"
        onChange={handleOnChange}
        className="bsh:p-1"
      >
        {data.map((item) => (
          <Field key={`checkbox_${item.value}`} className="bsh:flex bsh:flex-row bsh:items-center">
            <Checkbox
              className="bsh:group"
              value={item}
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
            <Label className="bsh:hover:cursor-pointer">{item.text}</Label>
          </Field>
        ))}
      </CheckboxGroup>
    </div>
  );
};

export const Default: Story = {
  args: {
    name: 'test',
  },
  render: (args) => <Template name={args.name} onChange={args.onChange} readOnly={args.readOnly} />,
};
