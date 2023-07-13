import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TestWrapper } from '../../../../utils/test';
import { FourthStep } from './fourth-step';

const FormProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      externalAccess: false,
      internetFacing: false,
      sourceRange: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FourthStep', () => {
  it("should render only external access input if it's off", () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <FourthStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(
      screen.getByTestId('switch-input-external-access')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('switch-input-internet-facing')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('text-input-source-range')
    ).not.toBeInTheDocument();
  });

  it('should render remaining fields when external access is on', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <FourthStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    fireEvent.click(screen.getByTestId('switch-input-external-access'));

    expect(
      screen.getByTestId('switch-input-external-access')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('switch-input-internet-facing')
    ).toBeInTheDocument();
    expect(screen.getByTestId('text-input-source-range')).toBeInTheDocument();
  });

  it('should delete text when clicking the trash icon', async () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <FourthStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    fireEvent.click(screen.getByTestId('switch-input-external-access'));

    const input = screen.getByTestId('text-input-source-range');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.getAttribute('value')).toBe('test');

    fireEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => expect(input.getAttribute('value')).toBe(''));
  });
});