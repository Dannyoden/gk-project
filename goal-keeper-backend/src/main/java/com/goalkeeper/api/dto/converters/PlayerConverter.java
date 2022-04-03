package com.goalkeeper.api.dto.converters;

import com.goalkeeper.api.domain.Player;
import com.goalkeeper.api.dto.PlayerDto;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class PlayerConverter implements Converter<Player, PlayerDto> {

    @Override
    public PlayerDto convert(Player player) {
        return PlayerDto.builder()
                .id(player.getPublicId())
                .givenName(player.getGivenName())
                .surname(player.getSurname())
                .shirtNumber(player.getShirtNumber())
                .position(player.getPosition().toString())
                .build();
    }

    public Player toEntity(PlayerDto playerDto) {
        return Player.builder()
                .publicId(playerDto.getId())
                .givenName(playerDto.getGivenName())
                .shirtNumber(playerDto.getShirtNumber())
                .surname(playerDto.getSurname())
                .position(Player.Position.valueOf(playerDto.getPosition()))
                .preferredFoot(Player.PreferredFoot.valueOf(playerDto.getPreferredFoot()))
                .dateOfBirth(playerDto.getDateOfBirth())
                .build();
    }

}
