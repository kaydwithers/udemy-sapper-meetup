import { writable } from "svelte/store";

const meetups = writable([
  {
    address: "1 Nerd Rd, New York",
    email: "code@test.com",
    description: "Experts will teach you to code.",
    id: "m1",
    imageUrl: "https://picsum.photos/1280/720",
    isFavorite: false,
    subtitle: "Learn to code in 2 hours",
    title: "Coding"
  },
  {
    address: "2 Nerd Rd, New York",
    description: "Experts will teach you to swim.",
    email: "swim@test.com",
    id: "m2",
    imageUrl: "https://picsum.photos/1280/720",
    isFavorite: true,
    subtitle: "Learn to code in 2 hours",
    title: "Swimming"
  }
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: meetupData => {
    const newMeetup = {
      ...meetupData
      // id: Math.random().toString()
      // isFavorite: false
    };
    meetups.update(items => {
      return [newMeetup, ...items];
    });
  },
  updateMeetup: (id, meetupData) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  removeMeetup: id => {
    meetups.update(items => {
      return items.filter(i => i.id !== id);
    });
  },
  toggleFavorite: id => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find(m => m.id === id) };
      updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
      const meetupIndex = items.findIndex(m => m.id === id);
      const updatedMeetups = [...items];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  }
};

export default customMeetupsStore;
