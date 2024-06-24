// __tests__/PostCard.test.tsx

import {render, screen, fireEvent, waitFor, act} from '@testing-library/react';
import PostCard from '@/components/PostCard';
import {renderWithProviders} from "@/utils/test-utils";
import {posts, user} from "@/mocks/handlers";

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));


describe('PostCard Component', () => {


  it('renders post and user information', async () => {
      await act(async () => renderWithProviders(<PostCard post={posts[0]} user={user} />));

      expect(screen.getByText('Leanne Graham')).toBeInTheDocument();

    }
  );
});