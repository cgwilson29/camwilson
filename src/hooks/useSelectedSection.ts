import { useCallback } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { isSectionId, type SectionId } from '../data/sections';

/** Selection state is the URL (#/about/:sectionId), so deep links and the back button work. */
export function useSelectedSection() {
  const match = useMatch('/about/:sectionId');
  const navigate = useNavigate();
  const id = match?.params.sectionId;
  const selected: SectionId | null = isSectionId(id) ? id : null;
  const select = useCallback(
    (next: SectionId | null) => navigate(next ? `/about/${next}` : '/'),
    [navigate],
  );
  return { selected, select };
}
