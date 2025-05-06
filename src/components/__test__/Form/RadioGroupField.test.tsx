import { render, screen, fireEvent } from '@testing-library/react'
import { RadioGroupField } from "../../Form/RadioGroupField";
import { vi } from 'vitest'

describe('RadioGroupField component', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
  ]
  const label = 'Choose an option'
  const name = 'radioGroup'
  const value = 'option1'

  it('renders the label correctly', () => {
    render(
      <RadioGroupField
        label={label}
        options={options}
        name={name}
        value={value}
        onChange={() => {}}
      />
    )
    const labelElement = screen.getByText(label)
    expect(labelElement).toBeInTheDocument()
  })

  it('renders all options', () => {
    render(
      <RadioGroupField
        label={label}
        options={options}
        name={name}
        value={value}
        onChange={() => {}}
      />
    )
    options.forEach((option) => {
      const optionElement = screen.getByLabelText(option.label)
      expect(optionElement).toBeInTheDocument()
    })
  })

  it('checks the selected option correctly', () => {
    render(
      <RadioGroupField
        label={label}
        options={options}
        name={name}
        value={value}
        onChange={() => {}}
      />
    )
    const selectedOption = screen.getByLabelText('Option 1')
    expect(selectedOption).toBeChecked()

    const unselectedOption = screen.getByLabelText('Option 2')
    expect(unselectedOption).not.toBeChecked()
  })

  it('calls onChange when an option is selected', () => {
    const handleChange = vi.fn()
    render(
      <RadioGroupField
        label={label}
        options={options}
        name={name}
        value={value}
        onChange={handleChange}
      />
    )

    const option2 = screen.getByLabelText('Option 2')
    fireEvent.click(option2)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith('option2')
  })
})
