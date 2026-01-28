import React from "react";
import { render, screen } from "@testing-library/react";

import { Thumbnail } from "./Thumbnail";
import { type ThumbnailProps } from "./thumbnail.types";

const makeSut = (rest: ThumbnailProps) => {
  render(<Thumbnail {...rest} data-testid="thumbnail-element" />);
};

describe("GIVEN <Thumbnail />", () => {
  describe("WHEN rendered", () => {
    it("THEN should render the empty thumbnail in case the src of the image is not sent", () => {
      makeSut({ alt: "alt image" });
      expect(screen.getByTestId("thumbnail-empty")).toBeDefined();
    });

    it("THEN should not render the empty thumbnail in case the src of the image is sent", () => {
      makeSut({ src: "http://myimage", alt: "alt image" });
      expect(screen.queryByTestId("thumbnail-empty")).toBeNull();
    });
  });

  describe("THEN should correctly render the submitted aspectRatio", () => {
    it("THEN should correctly render the aspectRatio default", () => {
      makeSut({ src: "http://myimage", alt: "alt image" });
      expect(screen.getByRole("img").getAttribute("class")).toContain(
        "aspectRatio_1/1"
      );
    });

    it("THEN should correctly render the aspectRatio 1/1", () => {
      makeSut({ src: "http://myimage", aspectRatio: "1/1", alt: "alt image" });
      expect(screen.getByRole("img").getAttribute("class")).toContain(
        "aspectRatio_1/1"
      );
    });

    it("THEN should correctly render the aspectRatio 1/2", () => {
      makeSut({ src: "http://myimage", aspectRatio: "1/2", alt: "alt image" });
      expect(screen.getByRole("img").getAttribute("class")).toContain(
        "aspectRatio_1/2"
      );
    });

    it("THEN should correctly render the aspectRatio 16/9", () => {
      makeSut({ src: "http://myimage", aspectRatio: "16/9", alt: "alt image" });
      expect(screen.getByRole("img").getAttribute("class")).toContain(
        "aspectRatio_16/9"
      );
    });

    it("THEN should correctly render the aspectRatio 2/1", () => {
      makeSut({ src: "http://myimage", aspectRatio: "2/1", alt: "alt image" });
      expect(screen.getByRole("img").getAttribute("class")).toContain(
        "aspectRatio_2/1"
      );
    });

    it("THEN should correctly render the aspectRatio 3/4", () => {
      makeSut({ src: "http://myimage", aspectRatio: "3/4", alt: "alt image" });
      expect(screen.getByRole("img").getAttribute("class")).toContain(
        "aspectRatio_3/4"
      );
    });

    it("THEN should correctly render the aspectRatio 4/3", () => {
      makeSut({ src: "http://myimage", aspectRatio: "4/3", alt: "alt image" });
      expect(screen.getByRole("img").getAttribute("class")).toContain(
        "aspectRatio_4/3"
      );
    });

    it("THEN should correctly render the aspectRatio 9/16", () => {
      makeSut({ src: "http://myimage", aspectRatio: "9/16", alt: "alt image" });
      expect(screen.getByRole("img").getAttribute("class")).toContain(
        "aspectRatio_9/16"
      );
    });
  });
});
