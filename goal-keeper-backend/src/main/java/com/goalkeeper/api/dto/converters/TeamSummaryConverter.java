package com.goalkeeper.api.dto.converters;

import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.dto.LabelValueDto;
import com.goalkeeper.api.dto.PlayerDto;
import com.goalkeeper.api.dto.TeamSummaryDataDto;
import com.goalkeeper.api.service.impl.SessionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
public class TeamSummaryConverter implements Converter<Map<String, Object>, TeamSummaryDataDto> {

    @Override
    public TeamSummaryDataDto convert(Map<String, Object> keyValues) {
        return TeamSummaryDataDto.builder()
                .clubTeamName((String) keyValues.get(SessionService.TEAM_NAME))
                .summaryData(getSummaryData(keyValues))
                .build();
    }

    private List<LabelValueDto> getSummaryData(Map<String, Object> keyValues) {
        List<LabelValueDto> values = new ArrayList<>();
        values.add(convertLabelValue(SessionService.AVG_SESSIONS, (Double) keyValues.get(SessionService.AVG_SESSIONS)));
        values.add(convertLabelValue(SessionService.TOTAL_SESSIONS, (Integer) keyValues.get(SessionService.TOTAL_SESSIONS)));
        values.add(convertLabelValue(SessionService.SESSIONS_3_WEEKS, (Long) keyValues.get(SessionService.SESSIONS_3_WEEKS)));
        values.add(convertLabelValue(SessionService.SESSIONS_2_WEEKS, (Long) keyValues.get(SessionService.SESSIONS_2_WEEKS)));
        values.add(convertLabelValue(SessionService.SESSIONS_1_WEEKS, (Long) keyValues.get(SessionService.SESSIONS_1_WEEKS)));
        values.add(convertLabelValue(SessionService.SESSIONS_THIS_WEEK, (Long) keyValues.get(SessionService.SESSIONS_THIS_WEEK)));
        values.add(convertLabelValue(SessionService.SESSIONS_PLANNED, (Long) keyValues.get(SessionService.SESSIONS_PLANNED)));
        return values;
    }

    public LabelValueDto convertLabelValue(String label, Number value) {
        return LabelValueDto.builder()
                .label(label)
                .value(value)
                .build();
    }
}
