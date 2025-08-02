import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input.component.tsx';
import { action } from 'storybook/actions';
import type { InputProps } from './input.props.ts';

const meta = {
  title: 'Form/Input',
  component: Input,
  args: {
    onInput: action('onInput'),
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: InputProps) => {
  return (
    <div className="bsh:w-[150px]">
      <Input
        {...args}
        className="bsh:block bsh:w-full bsh:border bsh:rounded-md bsh:border-black bsh:data-focussed:border-blue-500 bsh:data-placeholder-shown:border-green-500"
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
  },
  render: (args) => <Template {...args} />,
};
