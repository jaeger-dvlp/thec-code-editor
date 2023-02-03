import { UseTimer } from "@/components/editor/NavigationBar/Timer";

/* 
    What is purpose of this handler?

    Purpose of this handler is to handle incoming challenges from server and update the current challenge state.
    
    But why?
    Because we don't want to update the current challenge state with incoming challenge data directly.
    Because incoming data's key names are different than the current challenge state's key names.
    
    Incoming data's key names are like this: title_en, title_tr, question_en, question_tr, level, stack, starter_code, id
    Current challenge state's key names are like this: title: { en, tr }, question: { en, tr }, difficulty, stack, starterCode, code, id

    So we need to handle incoming data and update the current challenge state with the incoming data.
    
    But how?
    We need to create a schema for the incoming data and the current challenge state.
    Our schema contains the key names of the incoming data and the current challenge state.
    Then we need to loop through the schema and check if the incoming data has the same key name.
    If it has, we need to update the current challenge state with the incoming data.
    If it doesn't have, we need to keep the current challenge state's value.
    
    Happy hacking!
*/

const challengeSchema = {
  id: "id",
  difficulty: "level",
  title: {
    en: "title_en",
    tr: "title_tr",
  },
  question: {
    en: "question_en",
    tr: "question_tr",
  },
  stack: "stack",
  starterCode: "starter_code",
  code: "",
};

function challengeHandler() {
  const { timestamp } = UseTimer();
  const handle = (mainChallenge: any, incomingChallenge: any) => {
    if (mainChallenge && mainChallenge?.id !== "id") {
      return { ...mainChallenge, ...incomingChallenge };
    }

    Object.keys(challengeSchema).forEach((key) => {
      if (typeof challengeSchema[key] === "object") {
        return Object.keys(challengeSchema[key]).forEach((innerKey) => {
          if (incomingChallenge[challengeSchema[key][innerKey]]) {
            challengeSchema[key][innerKey] =
              incomingChallenge[challengeSchema[key][innerKey]];
          }
        });
      }

      if (incomingChallenge[challengeSchema[key]]) {
        challengeSchema[key] = incomingChallenge[challengeSchema[key]];
        return challengeSchema[key];
      }

      return challengeSchema[key];
    });

    const data = {
      ...challengeSchema,
      code: challengeSchema.starterCode,
      timestamp,
    };

    return {
      data,
    };
  };

  return { handle };
}

export default challengeHandler;
