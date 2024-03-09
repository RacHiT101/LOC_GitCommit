import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
  } from "react";
  import CheckoutModal from "../components/modals/CheckoutModal.jsx";
  
  const ModalContext = createContext({});
  
  const CheckoutModalProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const handleClose = useCallback(() => setOpen(false), []);
    const handleOpen = useCallback(() => setOpen(true), []);
  
    const [content, setContent] = useState({
      hasProduct: false,
      title: "",
      imageTitle: "",
      image: null,
      cost: 0,
      money: 0,
      type: 0,
      onClick: () => {},
    });
  
    const value = useMemo(
      () => ({
        open,
        handleClose,
        handleOpen,
        content,
        setContent,
      }),
      [open, content]
    );
  
    return (
      <ModalContext.Provider value={value}>
        <CheckoutModal />
        {children}
      </ModalContext.Provider>
    );
  };
  
  export default CheckoutModalProvider;
  
  export const useModal = () => useContext(ModalContext);
  