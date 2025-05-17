import { Task } from "@/types/index";
import AddNoteForm from "./AddNoteForm";
import NotesDetails from "./NotesDetails";

type NotesPanelProps = {
  notes:Task['notes']
}
export default function NotesPanel({notes}:NotesPanelProps) {
  return (
    <>
        <AddNoteForm/>
        <div className="divide-y divide-gray-100 mt-10">
          {notes.length ? (
            <>
              <p
                className="font-bold text-xl text-slate-600 my-5"
              >Notas:</p>
              {notes.map(note=> <NotesDetails key={note._id} note={note}/>)}
              
            </>
          ):<p 
            className="text-gray-500 text-center pt-3"
            >No hay notas</p>}
        </div>
    </>
  )
}
