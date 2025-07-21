import readline from 'node:readline/promises';
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const currentDatetime = new Date().toUTCString();


async function callAgent() {
  const r = readline.createInterface({input: process.stdin, output: process.stdout});


  const message = [
    {
      role: "system",
      content: `You are Kira, a smart college assistant. Your job is to help students stay organized by reminding them of upcoming assignments, exams, events, and deadlines. Be friendly, brief, and proactive in your responses,
            Current datetime: ${currentDatetime}`,
    },
  ];

  

  while(true){
    const question = await r.question("User: ");

    if(question === 'bye'){
      break;
    }

    message.push({
    role: "user",
    content: question,
  });

    while (true) {
    const completion = await groq.chat.completions.create({
      messages: message,
      model: "llama-3.3-70b-versatile",
      tools: [
        {
          type: "function",
          function: {
            name: "classDetails",
            description: "Get class details from day to day.",
            parameters: {
              type: "object",
              properties: {
                from: {
                  type: "string",
                  description: "Start date or day for class schedule",
                },
                to: {
                  type: "string",
                  description: "End date or day for class schedule",
                },
              },
              required: ["from", "to"],
            },
          },
        },
        {
          type: "function",
          function: {
            name: "eventDetails",
            description: 'Give details about upcoming events like TechFest between July 21 and July 28.',
            parameters: {
              type: "object",
              properties: {
                from: {
                  type: "string",
                  description: "Start date or day for event schedule",
                },
                to: {
                  type: "string",
                  description: "End date or day for event schedule",
                },
                eventName: {
                    type: "string",
                    description:"Name of the event."
                }
              },
              required: ["from", "to", "eventName"],
            },
          },
        },
      ],
    });
    // console.log(JSON.stringify(completion.choices[0], null, 2));

    message.push(completion.choices[0].message);

    const toolCalls = completion.choices[0].message.tool_calls;
    if (!toolCalls) {
      console.log(`Assistant: ${completion.choices[0].message.content}`);
      break;
    }

    for (const tool of toolCalls) {
      const functionName = tool.function.name;
      const functionArgs = tool.function.arguments;

      let result = "";
      if (functionName === "classDetails") {
        result = classDetails(JSON.parse(functionArgs));
      }else if(functionName === "eventDetails"){
        result = eventDetails(JSON.parse(functionArgs));
      }

      message.push({
        role: "tool",
        content: result,
        tool_call_id: tool.id,
      });

    //   console.log(JSON.stringify(completion2.choices[0], null, 2));
    }

  
  }
  }
}
callAgent();

function classDetails(from, to) {
  // console.log(`Fetching class details`);
  return "Class: DSA at 10:00 AM";
}

function eventDetails({ from, to, eventName }) {
  const allEvents = [
    { name: "TechFest", date: "2025-07-22", time: "5 PM"},
    { name: "Saturnallia", date: "2025-07-24", time: "11 AM"},
    { name: "Orion", date: "2025-07-25", time: "10 AM"},
  ];

  const filteredEvents = allEvents.filter(event => {
    return event.date >= from && event.date <= to &&
           (!eventName || event.name === eventName);
  });

  return filteredEvents.length
    ? filteredEvents.map(e => `${e.name} on ${e.date} at ${e.time}`).join("\n")
    : "No events found in the specified range.";
}