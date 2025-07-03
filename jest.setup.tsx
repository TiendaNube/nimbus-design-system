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
  EyeOffIcon: () => <svg />,
  SearchIcon: () => <svg />,
  ChevronDownIcon: () => <svg />,
  ChevronUpIcon: () => <svg />,
  CameraIcon: () => <svg />,
  ChevronLeftIcon: () => <svg />,
  ChevronRightIcon: () => <svg />,
}));
