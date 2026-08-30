import React, { useCallback, useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Button } from "@nimbus-ds/button";
import { Card } from "@nimbus-ds/card";
import { Tag } from "@nimbus-ds/tag";
import { Text } from "@nimbus-ds/text";
import { Title } from "@nimbus-ds/title";

interface PlaygroundSmokeProps {
  fullScreen?: boolean;
  initialConfirmed?: boolean;
}

export const PlaygroundSmoke: React.FC<PlaygroundSmokeProps> = ({
  fullScreen = false,
  initialConfirmed = false,
}) => {
  const [confirmed, setConfirmed] = useState(initialConfirmed);

  const handleConfirm = useCallback(() => setConfirmed(true), []);
  const handleReset = useCallback(() => setConfirmed(false), []);

  return (
    <Box
      alignItems="center"
      backgroundColor="neutral-surface"
      display="flex"
      justifyContent="center"
      minHeight={fullScreen ? "100vh" : "32rem"}
      padding="4"
      width="100%"
    >
      <Box maxWidth="30rem" width="100%">
        <Card padding="none">
          <Card.Header padding="base">
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
            >
              <Title as="h3">
                {confirmed ? "Prototype complete" : "Review mock order"}
              </Title>
              <Tag appearance="neutral">Mock data</Tag>
            </Box>
          </Card.Header>
          <Card.Body padding="base">
            <Box display="flex" flexDirection="column" gap="2">
              <Text fontWeight="bold">Nimbus notebook</Text>
              <Text color="neutral-textLow">Quantity: 1 · Total: $24.00</Text>
              <Box aria-live="polite">
                <Text>
                  {confirmed
                    ? "The simulated order was confirmed. No data was sent or persisted."
                    : "Confirm the order to verify that state transitions work in both preview surfaces."}
                </Text>
              </Box>
            </Box>
          </Card.Body>
          <Card.Footer padding="base">
            <Button
              appearance={confirmed ? "neutral" : "primary"}
              onClick={confirmed ? handleReset : handleConfirm}
            >
              {confirmed ? "Start again" : "Confirm mock order"}
            </Button>
          </Card.Footer>
        </Card>
      </Box>
    </Box>
  );
};

PlaygroundSmoke.displayName = "PlaygroundSmoke";
