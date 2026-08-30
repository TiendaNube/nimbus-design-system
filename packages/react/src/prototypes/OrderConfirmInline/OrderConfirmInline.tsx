import React, { useState } from "react";
import { Box } from "@nimbus-ds/box";
import { Card } from "@nimbus-ds/card";
import { Title } from "@nimbus-ds/title";
import { Text } from "@nimbus-ds/text";
import { Badge } from "@nimbus-ds/badge";
import { Button } from "@nimbus-ds/button";
import { Alert } from "@nimbus-ds/alert";
import { Divider } from "@nimbus-ds/divider";
import { Table } from "@nimbus-ds/table";
import { Spinner } from "@nimbus-ds/spinner";

/**
 * DISPOSABLE NIMBUS PROTOTYPE — packages/react/src/prototypes/OrderConfirmInline
 *
 * Learning question: are the confirmation action and its resulting outcome
 * (success / status change) clear enough to a Tiendanube Admin user reviewing
 * an order, when confirming happens inline (no navigation to another screen)?
 *
 * All order data below is mocked. See the prototype's stories file and pull
 * request description for the full list of simulated / hardcoded behavior.
 */

type OrderStatus = "reviewing" | "confirming" | "loading" | "confirmed";

interface MockLineItem {
  id: string;
  product: string;
  variant: string;
  quantity: number;
  price: number;
}

const MOCK_ORDER = {
  number: "1082",
  createdAt: "Aug 28, 2026 · 14:32",
  customerName: "Jordana Ferreira",
  shippingMethod: "Standard shipping (3-5 business days)",
  paymentMethod: "Credit card, paid",
};

const MOCK_ITEMS: MockLineItem[] = [
  { id: "1", product: "Canvas tote bag", variant: "Natural", quantity: 2, price: 24.9 },
  { id: "2", product: "Ceramic mug", variant: "Sand", quantity: 1, price: 18.5 },
  { id: "3", product: "Cotton scarf", variant: "Terracotta / M", quantity: 1, price: 32.0 },
];

const SHIPPING_COST = 9.9;
const SIMULATED_DELAY_MS = 900;

const formatCurrency = (value: number): string => `$${value.toFixed(2)}`;

export interface OrderConfirmInlineProps {
  /**
   * Starting status for the interaction. Exposed as a control so the team can
   * jump straight to a later step of the flow while exploring the prototype.
   * @default reviewing
   */
  initialStatus?: OrderStatus;
}

const statusBadge: Record<
  OrderStatus,
  { label: string; appearance: "neutral" | "warning" | "success" }
> = {
  reviewing: { label: "Pending confirmation", appearance: "neutral" },
  confirming: { label: "Pending confirmation", appearance: "neutral" },
  loading: { label: "Confirming…", appearance: "warning" },
  confirmed: { label: "Confirmed", appearance: "success" },
};

export const OrderConfirmInline = ({
  initialStatus = "reviewing",
}: OrderConfirmInlineProps) => {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);

  const subtotal = MOCK_ITEMS.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + SHIPPING_COST;

  const badge = statusBadge[status];

  const handleStartConfirm = () => setStatus("confirming");
  const handleCancelConfirm = () => setStatus("reviewing");

  const handleConfirm = () => {
    setStatus("loading");
    // Simulated backend call — no real order is confirmed anywhere.
    window.setTimeout(() => setStatus("confirmed"), SIMULATED_DELAY_MS);
  };

  const handleResetDemo = () => setStatus("reviewing");

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="4"
      padding="6"
      maxWidth="720px"
      marginX="auto"
    >
      <Card padding="base">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap="4"
        >
          <Box display="flex" flexDirection="column" gap="1">
            <Title as="h3">Order #{MOCK_ORDER.number}</Title>
            <Text color="neutral-textLow">
              {MOCK_ORDER.createdAt} · {MOCK_ORDER.customerName}
            </Text>
          </Box>
          <Badge appearance={badge.appearance}>{badge.label}</Badge>
        </Box>

        <Box marginY="4">
          <Divider />
        </Box>

        <Box display="flex" flexDirection="column" gap="2">
          <Text fontWeight="bold">Items</Text>
          <Table>
            <Table.Head>
              <Table.Row backgroundColor={{ rest: "neutral-surface" }}>
                <Table.Cell as="th">Product</Table.Cell>
                <Table.Cell as="th">Qty</Table.Cell>
                <Table.Cell as="th">Price</Table.Cell>
                <Table.Cell as="th">Subtotal</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {MOCK_ITEMS.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>
                    <Text fontWeight="medium">{item.product}</Text>
                    <Text fontSize="caption" color="neutral-textLow">
                      {item.variant}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>{formatCurrency(item.price)}</Table.Cell>
                  <Table.Cell>
                    {formatCurrency(item.price * item.quantity)}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Box>

        <Box marginY="4">
          <Divider />
        </Box>

        <Box display="flex" flexDirection="column" gap="1" alignItems="flex-end">
          <Text color="neutral-textLow">
            Subtotal: {formatCurrency(subtotal)}
          </Text>
          <Text color="neutral-textLow">
            Shipping: {formatCurrency(SHIPPING_COST)}
          </Text>
          <Text fontWeight="bold" fontSize="highlight">
            Total: {formatCurrency(total)}
          </Text>
        </Box>

        <Box marginY="4">
          <Divider />
        </Box>

        <Box display="flex" flexDirection="column" gap="1">
          <Text color="neutral-textLow">
            Shipping: {MOCK_ORDER.shippingMethod}
          </Text>
          <Text color="neutral-textLow">
            Payment: {MOCK_ORDER.paymentMethod}
          </Text>
        </Box>
      </Card>

      {status === "reviewing" && (
        <Box display="flex" justifyContent="flex-end">
          <Button appearance="primary" onClick={handleStartConfirm}>
            Confirm order
          </Button>
        </Box>
      )}

      {(status === "confirming" || status === "loading") && (
        <Alert appearance="warning" title="Confirm this order?">
          <Text>
            The customer will be notified and this can&apos;t be undone from
            here.
          </Text>
          <Box display="flex" justifyContent="flex-end" gap="2" marginTop="3">
            <Button
              appearance="neutral"
              onClick={handleCancelConfirm}
              disabled={status === "loading"}
            >
              Cancel
            </Button>
            <Button
              appearance="primary"
              onClick={handleConfirm}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <Box display="flex" alignItems="center" gap="2">
                  <Spinner size="small" color="currentColor" />
                  Confirming…
                </Box>
              ) : (
                "Yes, confirm order"
              )}
            </Button>
          </Box>
        </Alert>
      )}

      {status === "confirmed" && (
        <Alert appearance="success" title="Order confirmed">
          <Text>
            Order #{MOCK_ORDER.number} is now confirmed. {MOCK_ORDER.customerName}{" "}
            has been notified (simulated) and the status above updated to
            &quot;Confirmed&quot; — no page change was needed.
          </Text>
        </Alert>
      )}

      <Box display="flex" justifyContent="flex-start" marginTop="6">
        <Button appearance="transparent" size="small" onClick={handleResetDemo}>
          Reset prototype (facilitator only)
        </Button>
      </Box>
    </Box>
  );
};

OrderConfirmInline.displayName = "OrderConfirmInline";
