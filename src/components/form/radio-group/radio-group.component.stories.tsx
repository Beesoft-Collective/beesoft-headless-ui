import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './radio-group.component.tsx';
import { action } from 'storybook/actions';
import type { RadioChangeEvent, RadioGroupProps } from './radio-group.props.ts';
import { useState } from 'react';
import { RadioItem } from './radio-item.component.tsx';
import { Field } from '../../common/field/field.component.tsx';
import { Label } from '../../common/label/label.component.tsx';

const meta = {
  title: 'Form/Radio Group',
  component: RadioGroup,
  args: {
    onChange: action('onChange'),
  },
} satisfies Meta<typeof RadioGroup>;

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

const Template = (args: RadioGroupProps<TestData>) => {
  // @ts-expect-error can't figure out why this is throwing an error
  const [selected, setSelected] = useState<TestData>(data[0]);

  const handleOnChange = (event?: RadioChangeEvent) => {
    const selectedItem = data.find((item) => item.value === event?.value);

    if (selectedItem) {
      setSelected(selectedItem);
    }

    if (event) {
      args.onChange?.(event);
    }
  };

  return (
    <div className="bsh:w-full">
      <RadioGroup
        name="test"
        value={selected}
        readOnly={args.readOnly}
        comparator="value"
        onChange={handleOnChange}
        className="bsh:p-1"
      >
        {data.map((item) => (
          <Field key={`radio_${item.value}`} className="bsh:flex bsh:items-center bsh:gap-2">
            <RadioItem
              value={item}
              className="bsh:group bsh:flex bsh:size-5 bsh:items-center bsh:justify-center bsh:rounded-full bsh:border bsh:bg-white bsh:data-checked:bg-blue-400"
            >
              <span
                className="bsh:invisible bsh:size-2 bsh:rounded-full bsh:bg-white bsh:group-data-checked:visible"
              />
            </RadioItem>
            <Label>{item.text}</Label>
          </Field>
        ))}
      </RadioGroup>
    </div>
  );
};

export const Default: Story = {
  args: {
    name: 'test',
    readOnly: false,
  },
  render: (args) => <Template name={args.name} onChange={args.onChange} readOnly={args.readOnly} />,
};
