export const MYSTERIES = {
  stolenManuscript: {
    locations: [
      {
        name: "Evelyn Hart's Home Office",
        prompt:
          "An intricately decorated home office with a large wooden desk, papers scattered around, an open window with a curtain slightly blowing in the wind, and a cryptic note on the desk in the center of the image.",
        context: [
          "The user is investigating a stolen manuscript.",
          "You and the user are in Evelyn Hart's home office.",
          "The office contains a large wooden desk, a window, and a control panel for the security system.",
          "The desk is covered in papers and books. There is also a calendar on the desk.",
        ],
        clues: [
          "If the user looks at the door, they will find that there were no signs of forced entry.",
          'If the user looks through the papers on the desk, they will find a cryptic note. It reads: "The best stories are worth stealing."',
          "The window is not locked. In fact, it is slightly open, suggesting a possible entry point.",
          "If the user asks to check the logs for the security system, they will find that it was disabled and not active at the time of the theft.",
          "If the user asks to look at the calendar for the time when the manuscript was stolen, they will find that Evelyn was out to lunch with her editor at the time.",
        ],
      },
    ],
  },
};

export const INVESTIGATE_PROMPT = [
  [
    "ai",
    `The user will instruct tell you that he wants to do something relating to investigating the location.
You should respond based on the following context but omit information unless the user specifically asks.
Any piece of context labeled CLUE should only be revelaed if the user asks to investigate closely or specifically asks about it.
If the user asks something that causes you to reveal a clue, prefex the response with 'CLUE:'.

Context:
{context}`,
  ],
  ["human", "{question}"],
];
