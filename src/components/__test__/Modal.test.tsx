import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Modal from '../Modal';

describe('Modal Component', () => {
  it('should render modal when isOpen is true', () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render modal when isOpen is false', () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={false} title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onClose when the background is clicked', () => {
    const mockOnClose = vi.fn();
    render(
      <Modal isOpen={true} title="Test Modal" onClose={mockOnClose}>
        <p>Modal Content</p>
      </Modal>
    );
    fireEvent.click(screen.getByText('Test Modal').closest('div')!);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
