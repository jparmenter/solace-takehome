# Discussion

## Initial Clean Up

Saw common react issues to fix. 

- No Types
- onChange search needing debounce
- No loaading indication
- DOM manipulation instead of hooks
- useMemo to avoid multiple states for the same data

Co-Pilot coming in for the quick debounce and clean-up support.

Keep this part around 30 - 40 mins so I can try to focus on other things. I would add a unit test if this was real world and had more time.

## UX Time

- Styled the Header, p tags, and input into a cleaner format
- Made the input and reset button a group
- Added a sticky header
- Add Hover on row with possible brand color
- Made a badge for the Specialities to look cleaner


This part was a good chunk of time as I had to refresh my tailwind from working in MUI. With more time I would make this mobile friendly. Add more colors. I would also give some lift to the top portion and table with a card feel.

## API Enhancements

- Setup DB and added query parameter
- Created hook and updated UI to support backend filtering
- Started filtering non-string types
  - Hit some type errors I eventually ignored

Trying to do my best to stick the time limit! Given more time I would add a max page size (50) to not return a huge amount of data. Add pagination to the table. Maybe even sorting!

## Discussion and Additions

- More API changes
  - Pagination
  - Simple Sort
  - Filter on the jsonb / array type
- UI changes
  - Clickable headers for sort
  - Highlight searched text in table?
  - Accessibility
- Polish
  - More Colors. Definitely leaving it a little bland
  - More mobile friendly.