import { EventType } from './event.types';

export const makeEvent = (event: EventType): string => {
  if (!event.namespace) {
    return event.name;
  }
  return `${event.namespace}.${event.name}`;
};

export const bindEvent = (event: EventType, cb: (events: string[]) => void) => {
  const events: string[] = ['', 'error', 'skip', 'retry'].map((key) =>
    makeEvent({
      ...event,
      ...{ name: `${key !== '' ? `${event.name}.${key}` : event.name}` },
    }),
  );
  cb(events);
};
