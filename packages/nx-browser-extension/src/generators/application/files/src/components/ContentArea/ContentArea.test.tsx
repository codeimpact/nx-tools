import { render, screen } from '@testing-library/react';
import ContentArea from './ContentArea';
describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentArea />);
    expect(baseElement).toBeTruthy();
  });

  it('should contain the render text', () => {
    // given
    const text = 'content view';

    // when
    render(<ContentArea />);

    // then
    screen.getByText(text);
  });
});
