"use client";
import { Card } from "@/components/ui/card";
import { ATTENDANCE} from "@/text/attendance";
import { useEffect, useState } from "react";
import { AttendanceTable } from "@/components/attendance/attendanceTable";
import { ParticipantsIcon } from "@/components/attendance/icons/participantsIcon";
import { AttendedIcon } from "@/components/attendance/icons/attendedIcon";
import { AbsentIcon } from "@/components/attendance/icons/absentIcon";
import { useToast } from "@/components/ui/use-toast";
import { retrieveEvents } from "@/lib/actions/event";
import { EventType } from "@/types/event";
import moment from "moment";
import { retrieveAttendance } from "@/lib/actions/attendance";
import { AttendanceType } from "@/types/attendance";

export default function Attendance() {
  const { toast } = useToast();
  const [selectedEvent, setSelectedEvent] = useState<EventType>();
  const [events, setEvents] = useState<EventType[]>([]);
  const [attendance, setAttendance] = useState<AttendanceType[]>([]);
  const handleEvent = (event: EventType) => {
    setSelectedEvent(event);
  };

  useEffect(() => {
    const fetchData = async ({ event_id }: { event_id: number }) => {
      try {
        const response = await retrieveAttendance({ event_id });

        if (!response) {
          setAttendance([]);
          return;
        }

        setAttendance(response);
      } catch (error) {
        toast({ title: "Error", description: "Fail to load data" });
      }
    };

    if (selectedEvent) {
      fetchData({ event_id: selectedEvent?.event_id });
    }
  }, [selectedEvent]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventList = await retrieveEvents();
        setEvents(eventList);
        setSelectedEvent(eventList[0]);
      } catch (error) {
        toast({ title: "Error", description: "Fail to load data" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-full lg:flex-row">
      <main className="basis-3/4 p-6 bg-white lg:pr-6 lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">{selectedEvent?.name}</h1>
            <p className="text-muted-foreground">
              {moment(selectedEvent?.date).format("MMMM Do YYYY, h:mm a")}
            </p>
            <div className="flex gap-4 p-5">
              <Card className="w-40 p-4 ">
                <div className="flex gap-2 items-center">
                  <ParticipantsIcon />
                  <h3 className="text-xs text-muted-foreground">
                    {ATTENDANCE.TOTAL_PARTICIPANTS}
                  </h3>
                </div>
                <p className="pt-3 text-center text-base font-semibold">
                  {attendance.length}{ATTENDANCE.PEOPLE}
                </p>
              </Card>
              <Card className="w-40 p-4 ">
                <div className="flex gap-2 items-center">
                  <AttendedIcon />
                  <h3 className="text-xs text-muted-foreground">{ATTENDANCE.ATTEND}</h3>
                </div>
                <p className="pt-3 text-center text-base font-semibold">
                  {attendance.filter((member) => member.attended === 1).length}{" "}
                  {ATTENDANCE.PEOPLE}
                </p>
              </Card>
              <Card className="w-40 p-4 ">
                <div className="flex gap-2 items-center">
                  <AbsentIcon />
                  <h3 className="text-xs text-muted-foreground">{ATTENDANCE.ABSENT}</h3>
                </div>
                <p className="pt-3 text-left text-base font-semibold">
                  {attendance.length -
                    attendance.filter((member) => member.attended === 1)
                      .length}{" "}
                  {ATTENDANCE.PEOPLE}
                </p>
              </Card>
            </div>
          </div>
        </div>
        <AttendanceTable members={attendance} />
      </main>
      <aside className="basis-1/4 xl:w-80 bg-slate-50 p-6 rounded-xl">
        <div className="mb-6">
          <div className="space-y-4 mt-4">
            <h2 className="text-lg font-bold">{ATTENDANCE.SELECT_EVENTS}</h2>
            {events.map((event, index) => (
              <Card
                key={index}
                className="p-4 hover:bg-slate-300 hover:cursor-pointer"
                onClick={() => handleEvent(event)}
              >
                <h1 className="text-lg font-semibold">{event.name}</h1>
                <p className="text-sm">{event.topic}</p>
                <p className="text-xs text-gray-400 text-muted-foreground">
                  {moment(event.date).format("MMMM Do YYYY, h:mm a")}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
