"use client";

import { useCallback, useState } from "react";

interface DisclosureOptions {
  defaultIsOpen?: boolean;
}

export const useDisclosure = ({
  defaultIsOpen = false,
}: DisclosureOptions = {}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return {
    isOpen,
    onOpen: useCallback(() => setIsOpen(true), []),
    onClose: useCallback(() => setIsOpen(false), []),
    onToggle: useCallback(() => setIsOpen(prev => !prev), []),
  };
};

export type Disclosure = ReturnType<typeof useDisclosure>;
