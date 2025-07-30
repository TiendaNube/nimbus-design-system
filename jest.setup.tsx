import "@vanilla-extract/css/disableRuntimeStyles";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("@nimbus-ds/icons", () => ({
  __esModule: true,
  ...jest.requireActual("@nimbus-ds/icons"),
  CloseIcon: () => <svg />,
  InfoCircleIcon: () => <svg />,
  ExclamationCircleIcon: () => <svg />,
  ExclamationTriangleIcon: () => <svg />,
  CheckCircleIcon: () => <svg />,
  PlusCircleIcon: () => <svg />,
  EyeIcon: () => <svg />,
  EyeOffIcon: () => <svg />,
  SearchIcon: () => <svg />,
  ChevronDownIcon: () => <svg />,
  ChevronUpIcon: () => <svg />,
  CameraIcon: () => <svg />,
  ChevronLeftIcon: () => <svg />,
  ChevronRightIcon: () => <svg />,
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock scrollTo method
Element.prototype.scrollTo = jest.fn();
