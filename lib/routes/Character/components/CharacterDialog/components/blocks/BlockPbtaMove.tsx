import { css } from "@emotion/css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import {
  ContentEditable,
  previewContentEditable,
} from "../../../../../../components/ContentEditable/ContentEditable";
import { FateLabel } from "../../../../../../components/FateLabel/FateLabel";
import { IPbtaMoveBlock, IPbtaMoveBlockValue } from "../../../../../../domains/character/types";
import { useTranslate } from "../../../../../../hooks/useTranslate/useTranslate";
import {
  IBlockActionComponentProps,
  IBlockComponentProps,
} from "../../types/IBlockComponentProps";
import { BlockToggleMeta } from "../BlockToggleMeta";

export function BlockPbtaMove(props: IBlockComponentProps<IPbtaMoveBlock> & {}) {
  const isLabelVisible = !!previewContentEditable({ value: props.block.label }) || props.advanced;
  const isSlotTrackerVisible = props.block.meta?.checked === true || props.block.meta?.checked === false;
  const { t } = useTranslate();
  const valueChanged = (name: string, newVal: string) => {
    const updated = Object.assign({}, props.block.value);
    const fieldName = name as keyof IPbtaMoveBlockValue;
    updated[fieldName] = newVal;
    props.onValueChange(updated);
  };

  return (
    <>
      <Box>
        <Grid
          container
          spacing={1}
          justifyContent="space-between"
          wrap="nowrap"
          direction="column"
        >
          <Grid item xs>
            {isLabelVisible && (
              <Box>
                <FateLabel display="inline">
                  <ContentEditable
                    readonly={props.readonly || !props.advanced}
                    border={props.advanced}
                    data-cy={`${props.dataCy}.label`}
                    value={props.block.label}
                    onChange={(value) => {
                      props.onLabelChange(value);
                    }}
                  />
                </FateLabel>
              </Box>
            )}
          </Grid>
          <Grid item xs>
            <Grid
              container
              justifyContent="space-between"
              wrap="nowrap" >
              <Grid item xs>
                <Box>
                  <Typography>
                    <strong>{t('character-dialog.pbta-block.dialog.trigger')}</strong>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box>
                  <Typography>
                    <em>
                      <ContentEditable
                        border
                        data-cy={`${props.dataCy}.value`}
                        readonly={props.readonly || !props.advanced}
                        value={props.block.value.trigger}
                        onChange={(value) => {
                          valueChanged('trigger', value);
                        }}
                      />
                    </em>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid
              container
              justifyContent="space-between"
              wrap="nowrap" >
              <Grid item xs>
                <Box>
                  <Typography>
                    <strong>{t( "character-dialog.pbta-block.dialog.roll-stat")}</strong>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={9}>
                <Box>
                  <Typography>
                    <ContentEditable
                      border
                      data-cy={`${props.dataCy}.value`}
                      readonly={props.readonly || !props.advanced}
                      value={props.block.value.stat}
                      onChange={(value) => {
                        valueChanged('stat', value);
                      }}

                    />
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid
              container
              justifyContent="space-between"
              wrap="nowrap" >
              <Grid item xs>
                <Box>
                  <Typography>
                    <strong>{t("character-dialog.pbta-block.dialog.success")}</strong>
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={9}>

                <Box>
                  <Typography>
                    <ContentEditable
                      border
                      data-cy={`${props.dataCy}.value`}
                      readonly={props.readonly || !props.advanced}
                      value={props.block.value.success}
                      onChange={(value) => {
                        valueChanged('success', value);
                      }}
                    />
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            wrap="nowrap" >
            <Grid item xs>
              <Box>
                <Typography>
                  <strong>{t( "character-dialog.pbta-block.dialog.intermediate")}</strong>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Box>
                <Typography>
                  <ContentEditable
                    border
                    data-cy={`${props.dataCy}.value`}
                    readonly={props.readonly || !props.advanced}
                    value={props.block.value.partial}
                    onChange={(value) => {
                      valueChanged('partial', value);
                    }}

                  />
                </Typography>
              </Box>
            </Grid>

          </Grid>
          <Grid item xs>
            <Box>
              <Typography>
                <ContentEditable
                  border
                  data-cy={`${props.dataCy}.value`}
                  readonly={props.readonly || !props.advanced}
                  value={props.block.value.notes}
                  onChange={(value) => {
                    valueChanged('notes', value);
                  }}

                />
              </Typography>
            </Box>
          </Grid>
          {isSlotTrackerVisible && (
            <Grid item className={css({ marginLeft: "auto" })}>
              <BlockToggleMeta
                readonly={props.readonly}
                dataCy={props.dataCy}
                block={props.block}
                onMetaChange={props.onMetaChange}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}
BlockPbtaMove.displayName = "BlockPbtaMove";

export function BlockPbtaMoveActions(
  props: IBlockActionComponentProps<IPbtaMoveBlock>
) {
  const theme = useTheme();
  const { t } = useTranslate();
  return (
    <>
      <Grid item>
        <Link
          component="button"
          variant="caption"
          className={css({
            color: theme.palette.primary.main,
          })}
          onClick={() => {
            props.onMetaChange({
              ...props.block.meta,
              checked:
                props.block.meta.checked === undefined ? false : undefined,
            });
          }}
          underline="hover"
        >
          {props.block.meta.checked === undefined
            ? t("character-dialog.control.add-toggle")
            : t("character-dialog.control.remove-toggle")}
        </Link>
      </Grid>

    </>
  );
}

BlockPbtaMoveActions.displayName = "BlockPbtaMoveActions";
