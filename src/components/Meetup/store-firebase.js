import { writable } from "svelte/store";

const meetupsFirebase = writable([]);

const customMeetupsStoreFirebase = {
  subscribe: meetupsFirebase.subscribe,
  setMeetups: meetupArray => {
    meetupsFirebase.set(meetupArray);
  },
  addMeetups: meetup => {
    meetupsFirebase.update(items => {
      return items.concat(meetup);
    });
  },
  updateMeetup: (id, meetupData) => {
    meetupsFirebase.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: id => {
    meetupsFirebase.update(items => {
      return items.filter(i => i.id !== id);
    });
  },
  toggleFavorite: id => {
    meetupsFirebase.update(items => {
      const updatedMeetup = { ...items.find(m => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex(m => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  }
};

export default customMeetupsStoreFirebase;
