import { fireEvent, render, screen, within } from '@testing-library/react';
import { createElement, createRef, type ComponentType } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { PasswordInput as AriaPasswordInput } from '@/registry/bases/aria/password-input/password-input';
import { PasswordInput as BasePasswordInput } from '@/registry/bases/base/password-input/password-input';
import { PasswordInput as RadixPasswordInput } from '@/registry/bases/radix/password-input/password-input';

const bases = [
  ['base', BasePasswordInput],
  ['radix', RadixPasswordInput],
  ['aria', AriaPasswordInput],
] as const;

describe.each(bases)('%s password input', (_base, PasswordInput) => {
  it('toggles visibility and keeps an uncontrolled value', () => {
    render(<PasswordInput aria-label="Password" defaultValue="secret words" />);
    const input = screen.getByLabelText('Password');

    expect(input.getAttribute('type')).toBe('password');
    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));
    expect(input.getAttribute('type')).toBe('text');
    expect(screen.getByRole('button', { name: 'Hide password' })).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Hide password' }));
    expect(input.getAttribute('type')).toBe('password');
    expect((input as HTMLInputElement).value).toBe('secret words');
    expect(screen.getByRole('button', { name: 'Show password' })).toBeTruthy();
  });

  it('disables the input and toggle together', () => {
    render(<PasswordInput aria-label="Password" disabled />);

    expect((screen.getByLabelText('Password') as HTMLInputElement).disabled).toBe(true);
    expect(
      (screen.getByRole('button', { name: 'Show password' }) as HTMLButtonElement).disabled
    ).toBe(true);
  });

  it('forwards an input ref', () => {
    const inputRef = createRef<HTMLInputElement>();
    render(<PasswordInput aria-label="Password" ref={inputRef} />);

    expect(inputRef.current).toBe(screen.getByLabelText('Password'));
  });

  it('always starts as a password when called with a JavaScript type prop', () => {
    const JavascriptPasswordInput = PasswordInput as unknown as ComponentType<
      Record<string, unknown>
    >;
    const input = createElement(JavascriptPasswordInput, {
      'aria-label': 'Password',
      type: 'text',
    } as Parameters<typeof PasswordInput>[0] & { type: string });
    render(input);

    expect(screen.getByLabelText('Password').getAttribute('type')).toBe('password');
  });
  it('passes through value and aria-invalid unchanged', () => {
    render(
      <PasswordInput
        aria-label="Password"
        aria-invalid="true"
        name="account-password"
        value="provided value"
        onChange={() => {}}
      />
    );
    const input = screen.getByLabelText('Password');

    expect((input as HTMLInputElement).value).toBe('provided value');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect((input as HTMLInputElement).name).toBe('account-password');
  });

  it('hides the browser reveal control', () => {
    render(<PasswordInput aria-label="Password" />);

    expect(screen.getByLabelText('Password').getAttribute('class')).toContain(
      '[&::-ms-reveal]:hidden'
    );
  });

  it('does not submit a form when toggling visibility', () => {
    const onSubmit = vi.fn();
    render(
      <form onSubmit={onSubmit}>
        <PasswordInput aria-label="Password" />
      </form>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Show password' }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('puts className on the input group root around its toggle', () => {
    render(<PasswordInput aria-label="Password" className="w-64" />);
    const root = screen.getAllByRole('group')[0];

    expect(root.getAttribute('data-slot')).toBe('password-input');
    expect(root.getAttribute('class')).toContain('w-64');
    expect(within(root).getByRole('button', { name: 'Show password' })).toBeTruthy();
  });
  it('allows custom accessible labels', () => {
    render(
      <PasswordInput aria-label="Password" showLabel="Reveal secret" hideLabel="Conceal secret" />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Reveal secret' }));
    expect(screen.getByRole('button', { name: 'Conceal secret' })).toBeTruthy();
  });
});
