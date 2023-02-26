import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useMemo } from "react";
import MyModal from "./MyModal";


import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const BasicCalendar = () => {
  const [events, setEvents] = useState([]);

  const [modalStatus, setModalStatus] = useState(false);
  const [eventInput, setEventInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const [eventId, setEventId] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const { views } = useMemo(
    () => ({
      views: ['month', 'week', 'work_week', 'day']
    }),
    []
  )

  const handleClose = () => {
    setModalStatus(false);
    setEventInput("");
  };

  const handleChange = (e) => {
    setEventInput(e.target.value);
  };

  const handleSave = () => {
    setModalStatus(false);
    if (eventInput) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          title: `${eventInput}`,
          start: new Date(`${startDate}`),
          end: new Date(`${endDate}`),
        },
      ]);
    }
  };


  const handleSlotSelectEvent = (slotInfo) => {
    setStartDate(new Date(`${slotInfo.start}`));
    setEndDate(new Date(`${slotInfo.end}`));
    setModalStatus(true);
    setEventInput("");
  };

  const tileDisabled = ({ start, date, view }) => {
    return start < new Date()
 };
  const moveEventHandler = ({ event, start, end }) => {
    let updatedEvents = [];
    updatedEvents = events.filter((e) => {
      return e.id !== event.id;
    });
    setEvents([
      ...updatedEvents,
      {
        id: `${event.id}`,
        title: `${event.title}`,
        start: new Date(`${start}`),
        end: new Date(`${end}`),
      },
    ]);
  };

  const resizeEventHandler = ({ event, start, end }) => {
    let updatedEvents = [];
    updatedEvents = events.filter((e) => {
      return e.id !== event.id;
    });
    setEvents([
      ...updatedEvents,
      {
        id: `${event.id}`,
        title: `${event.title}`,
        start: new Date(`${start}`),
        end: new Date(`${end}`),
      },
    ]);
  };

  const handleOnSelectEvent = (e) => {
    setEditStatus(true);
    setStartDate(new Date(`${e.start}`));
    setEndDate(new Date(`${e.end}`));
    setEventInput(e.title);
    setEventId(e.id);
    setModalStatus(true);
  };

  const handleEditEvent = (e) => {
    setEventInput(e.target.value);
  };
  const handleEdited = (e) => {
    setModalStatus(false);
    let updatedEvents = [];
    if (eventInput) {
      updatedEvents = events.filter((e) => {
        return e.id !== eventId;
      });
      setEvents([
        ...updatedEvents,
        {
          id: `${eventId}`,
          title: `${eventInput}`,
          start: new Date(`${startDate}`),
          end: new Date(`${endDate}`),
        },
      ]);
    } else {
      updatedEvents = events.filter((e) => {
        return e.id !== eventId;
      });
      setEvents([...updatedEvents]);
    }
    setEditStatus(false);
    setEventInput("");
  };

  const handleDelete = () => {
    let updatedEvents = [];
    updatedEvents = events.filter((e) => {
      return e.id !== eventId;
    });
    setEvents([...updatedEvents]);
    setModalStatus(false);
    setEventInput("");
  };

  return (
    <div className="my-calendar">
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        step = {5}
        timeslots={6}
        tileDisabled={tileDisabled}
        onSelectSlot={handleSlotSelectEvent}
        onSelectEvent={handleOnSelectEvent}
        onEventDrop={moveEventHandler}
        resizable
        onEventResize={resizeEventHandler}
        longPressThreshold={10}
        views={views}
        
      />
      <MyModal
        modalStatus={modalStatus}
        handleClose={handleClose}
        handleSave={handleSave}
        handleChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        eventInput={eventInput}
        handleEditEvent={handleEditEvent}
        handleEdited={handleEdited}
        editStatus={editStatus}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BasicCalendar;
