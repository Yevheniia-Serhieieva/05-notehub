import { useEffect, useState } from "react";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";
import toast from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch],
    queryFn: () => fetchNotes(currentPage, 12, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      toast.error("Whops.. error");
    }
  }, [isError]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={search} onSearchChange={setSearch} />

          {data && data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}

          {
            <button onClick={openModal} className={css.button}>
              Create note +
            </button>
          }
        </header>

        {isLoading && <Loader />}

        {isError && <ErrorMessage />}

        {!isLoading && !isError && data?.notes?.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <NoteList notes={data?.notes || []} />
        )}

        {isModalOpen && (
          <Modal onClose={closeModal}>
            <NoteForm onCancel={closeModal} />
          </Modal>
        )}
      </div>
    </>
  );
}
