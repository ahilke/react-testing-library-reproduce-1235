import { Box, Button, Collapse, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";
import { useCallback, useState } from "react";

interface FilterAccordionProps {
  title: string;
  onClear(): void;
  disableClear: boolean;
  children?: ReactNode;
}

export const FilterAccordion: FC<FilterAccordionProps> = ({ children, title, onClear, disableClear }) => {
  const [collapsed, setCollapsed] = useState(false);

  const resetFilter = useCallback(() => !disableClear && onClear(), [disableClear, onClear]);

  return (
    <div>
      <div onClick={() => setCollapsed(!collapsed)}>
        <Typography>{title}</Typography>
        <div>
          <Button onClick={() => setCollapsed(!collapsed)}>toggle</Button>
        </div>
      </div>
      <Collapse in={collapsed}>
        <div>
          {children}
          <div>
            <Box onClick={resetFilter}>
              <Typography>reset_filter</Typography>
            </Box>
          </div>
        </div>
      </Collapse>
    </div>
  );
};
