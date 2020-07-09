import React from "react";
import {
  Title,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  EmptyStateBody,
} from "@patternfly/react-core";
import { CubesIcon } from "@patternfly/react-icons";

function SimpleEmptyState() {
  return (
    <EmptyState variant={EmptyStateVariant.full}>
      <EmptyStateIcon icon={CubesIcon} />
      <Title headingLevel="h5" size="lg">
        Empty State
      </Title>
      <EmptyStateBody>
        Please select appropriate Version and Locale to display images.
      </EmptyStateBody>
    </EmptyState>
  );
}
export default SimpleEmptyState;
