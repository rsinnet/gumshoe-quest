export const markClueAsDiscovered = async (
  progress,
  locationIndex,
  clueText,
) => {
  const location = progress.mystery.locations[locationIndex];
  const locationProgress = progress.locations[locationIndex];

  // First look in clues, then look in misleading clues.
  // TODO(RWS): Ensure clues are reproduced with exact text.
  let clueIndex = location.clues.indexOf(clueText);
  let misleadingClueIndex = location.misleadingClues.indexOf(clueText);
  if (clueIndex >= 0) {
    locationProgress.clues[index] = true;
  } else if (misleadingClueIndex >= 0) {
    locationProgress.misleadingClues[index] = true;
  } else {
    return;
  }
  await progress.save();
};
