import Nobr from "@/components/utilities/Nobr";

const QUOTE_TABLES = {
  refine_ideas: {
    sections: [
      {
        title: {
          primary: "Goals",
          secondary: "How This Might Be Addressed",
        },
        rows: [
          {
            primary: "Provide clear benefit and value to those who wouldn’t otherwise use 3D printing to solve their issues.",
            secondary: "Strong messaging, and UX, suited for those unfamiliar with 3D printing.",
          },
          {
            primary: "Ensure both customers and makers have a confident trust in the service.",
            secondary: "Vet makers & verify skills. Add verification checkpoints throughout the ordering process.",
          },
        ],
      },
      {
        title: {
          primary: "Concerns",
        },
        rows: [
          {
            primary: "What would get everyday consumers to use this service over alternatives?",
            secondary: "Cheap customizability. Encourage ‘window-shopping’ within the service, show examples of what printing can offer.",
          },
          {
            primary: "Would owners of 3D printers be interested in participating in this service?",
            secondary: "Fair compensation for makers, and realistic deadlines with room for human error.",
          },
        ],
      },
    ],
  },

  concerns: {
    sections: [
      {
        title: false,
        rows: [
          {
            primary: {
              title: "Distribution of responsibilities",
              content: "Draw a line separating the responsibilities of makers, and customers.",
            },
            secondary: {
              quote: (
                <>
                  &ldquo;It&rsquo;s a question of distributing responsibility. There&rsquo;s 2 types of problems: maker problems, and customer
                  problems.&rdquo; <Nobr>- Layperson #3</Nobr>
                </>
              ),
            },
          },
          {
            primary: {
              title: "Ensure a viable work experience for makers",
              content: "Appropriate deadlines for printers, with some kind of flexibility.",
            },
            secondary: {
              quote: (
                <>
                  &ldquo;There&rsquo;s a lot of little steps and things that go into making the print that can take time.&rdquo;
                  <Nobr>- Maker #3</Nobr>
                </>
              ),
            },
          },
          {
            primary: {
              title: "3D modelling adds too much complication",
              content: "Model creation and design is whole service in itself; including it in the service would drastically affect scope.",
            },
            secondary: {
              quote: (
                <>
                  &ldquo;I can&rsquo;t model things for people, so I&rsquo;m not very interested in that side of the service.&rdquo;
                  <Nobr>- Maker #3</Nobr>
                </>
              ),
            },
          },
        ],
      },
    ],
  },
};

export default QUOTE_TABLES;
