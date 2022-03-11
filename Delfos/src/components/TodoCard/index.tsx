import React from "react";
import { BackgroundLinear } from "../BackgroundLinear";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { RectButtonProps } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Container,
  ToDo,
  DatesAndHour,
  Dates,
  Hours,
  MarkedIcon,
  Details,
} from "./styles";

interface Props extends RectButtonProps {
  name?: string | null;
  trigger?: {
    type: string;
    repeat?: boolean;
    hour?: number;
    minute?: number;
    seconds?: number;
    weekday?: number;
  };
  checked?: boolean;
  handleDelete?: () => void;
}

export function TodoCard({
  name,
  trigger,
  checked,
  handleDelete,
  ...rest
}: Props) {
  const theme = useTheme();

  function getDayWeekName(weekDayNumber: number) {
    const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    return days[weekDayNumber - 1];
  }

  return (
    <BackgroundLinear checked={checked}>
      <Container>
        <ToDo>
          {name} {trigger?.repeat && "loop"}
        </ToDo>
        <Details>
          <DatesAndHour>
            <Dates checked={checked}>
              {trigger?.weekday
                ? getDayWeekName(trigger.weekday)
                : trigger?.type == "daily"
                ? "diário"
                : "Único"}
            </Dates>
            <Hours checked={checked}>
              {trigger?.hour ? trigger?.hour : trigger?.seconds} :
              {trigger?.minute ? trigger?.minute : ""}
            </Hours>
          </DatesAndHour>
          {checked && (
            <GestureHandlerRootView>
              <MarkedIcon
                checked={checked}
                onPress={handleDelete}
                style={{ marginRight: 5 }}
              >
                <Feather
                  name={"x-circle"}
                  size={35}
                  color={theme.colors.cancel}
                />
              </MarkedIcon>
            </GestureHandlerRootView>
          )}

          {/** Infelizmente não pensei em uma forma de remarcar os ToDos de Timeinterval
           * quando descobrir isso basta retirar essa lógica de verificação */}

          {!checked ? (
            <GestureHandlerRootView>
              <MarkedIcon checked={checked} {...rest}>
                <Feather
                  name={checked ? "check-square" : "square"}
                  size={35}
                  color={theme.colors.text}
                />
              </MarkedIcon>
            </GestureHandlerRootView>
          ) : (
            trigger?.type != "timeInterval" && (
              <GestureHandlerRootView>
                <MarkedIcon checked={checked} {...rest}>
                  <Feather
                    name={checked ? "check-square" : "square"}
                    size={35}
                    color={theme.colors.text}
                  />
                </MarkedIcon>
              </GestureHandlerRootView>
            )
          )}
        </Details>
      </Container>
    </BackgroundLinear>
  );
}
