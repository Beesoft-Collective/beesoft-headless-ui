import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './radio-group.component.tsx';
import { action } from 'storybook/actions';
import type { RadioGroupProps } from './radio-group.props.ts';

const meta = {
  title: 'Form/Radio Group',
  component: RadioGroup,
  args: {
    onChange: action('onChange'),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const data = [
  { value: 'item1', text: 'Item 1' },
  { value: 'item2', text: 'Item 2' },
  { value: 'item3', text: 'Item 3' },
  { value: 'item4', text: 'Item 4' },
];

const Template = (args: RadioGroupProps) => {

};
